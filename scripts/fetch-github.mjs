import "dotenv/config";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "..", "src", "data", "github.json");

const TOKEN = process.env.PRIVATE_GITHUB_TOKEN;
const USERNAME = "Meldiron";
const START_DATE = "2021-08-01";

if (!TOKEN) {
  console.error("PRIVATE_GITHUB_TOKEN is not set");
  process.exit(1);
}

async function getContributions(year) {
  const fromDate = `${year}-01-01T00:00:00Z`;
  const toDate = `${year}-12-31T23:59:59Z`;

  const body = {
    query: `query {
      user(login: "${USERNAME}") {
        contributionsCollection(from: "${fromDate}", to: "${toDate}") {
          contributionCalendar {
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { Authorization: `bearer ${TOKEN}` },
  });
  const data = await response.json();

  if (data.errors) {
    console.error(`Error fetching ${year}:`, data.errors);
    return [];
  }

  return data.data.user.contributionsCollection.contributionCalendar.weeks;
}

// GitHub search API caps at 1000 results per query, so we fetch year by year
async function fetchPRsForRange(from, to) {
  const prs = [];
  let cursor = null;
  let hasNext = true;

  while (hasNext) {
    const afterClause = cursor ? `, after: "${cursor}"` : "";
    const body = {
      query: `query {
        search(query: "author:${USERNAME} type:pr sort:created-desc created:${from}..${to}", type: ISSUE, first: 100${afterClause}) {
          pageInfo { hasNextPage endCursor }
          nodes {
            ... on PullRequest {
              title
              url
              createdAt
              repository { nameWithOwner }
            }
          }
        }
      }`,
    };

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { Authorization: `bearer ${TOKEN}` },
    });
    const data = await response.json();

    if (data.errors) {
      console.warn("  Warning (continuing):", data.errors[0]?.message);
    }

    const search = data.data?.search;
    if (!search) {
      console.error("  No search data returned, stopping pagination");
      break;
    }

    for (const node of search.nodes) {
      if (node && node.title && node.repository) {
        prs.push({
          title: node.title,
          url: node.url,
          createdAt: node.createdAt,
          repo: node.repository.nameWithOwner,
        });
      }
    }

    hasNext = search.pageInfo.hasNextPage;
    cursor = search.pageInfo.endCursor;
  }

  return prs;
}

async function getAllPRs() {
  const allPRs = [];
  const startYear = parseInt(START_DATE.split("-")[0], 10);
  const currentYear = new Date().getFullYear();

  for (let year = startYear; year <= currentYear; year++) {
    const from = year === startYear ? START_DATE : `${year}-01-01`;
    const to = year === currentYear
      ? new Date().toISOString().split("T")[0]
      : `${year}-12-31`;

    console.log(`  ${from} .. ${to} ...`);
    const prs = await fetchPRsForRange(from, to);
    allPRs.push(...prs);
    console.log(`    ${prs.length} PRs (total: ${allPRs.length})`);
  }

  return allPRs;
}

async function main() {
  const currentYear = new Date().getFullYear();

  // Fetch contributions
  console.log("Fetching contributions...");
  const allWeeks = [];
  const seenFirstDays = new Set();

  for (let year = 2021; year <= currentYear; year++) {
    console.log(`  Year ${year}...`);
    const weeks = await getContributions(year);
    for (const week of weeks) {
      if (!seenFirstDays.has(week.firstDay)) {
        seenFirstDays.add(week.firstDay);
        allWeeks.push(week);
      }
    }
  }
  console.log(`  Total: ${allWeeks.length} unique weeks`);

  // Fetch PRs
  console.log("Fetching pull requests...");
  const prs = await getAllPRs();
  console.log(`  Total: ${prs.length} PRs`);

  // Write JSON
  const data = {
    fetchedAt: new Date().toISOString(),
    weeks: allWeeks,
    prs,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`Written to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
