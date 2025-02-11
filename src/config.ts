import type {
  NavBarLink,
  AboutPageContent,
  ProjectPageContent,
  BlogPageContent,
  HomePageContent,
} from "./types/config";

export const navBarLinks: NavBarLink[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "About",
    url: "/about",
  },
];

// Home (/)
export const homePageContent: HomePageContent = {
  techstack: [
    {
      name: "Frameworks",
      items: [
        {
          icon: "devicon:capacitor",
          name: "Capacitor",
        },
        {
          icon: "devicon:processing",
          name: "Processing",
        },
        {
          icon: "devicon:qwik",
          name: "Qwik",
        },

        {
          icon: "devicon:solidjs",
          name: "SolidJS",
        },
        {
          icon: "devicon:angular",
          name: "Angular",
        },
        {
          icon: "devicon:alpinejs",
          name: "Alpine.js",
        },

        {
          icon: "devicon:unity",
          name: "Unity",
        },
        {
          icon: "devicon:flutter",
          name: "Flutter",
        },
        {
          icon: "devicon:ionic",
          name: "Ionic",
        },
        {
          icon: "devicon:vuejs",
          name: "Vue",
        },
        {
          icon: "devicon:nuxtjs",
          name: "Nuxt",
        },
        {
          icon: "devicon:svelte",
          name: "Svelte",
        },
        {
          icon: "devicon:astro",
          invert: true,
          name: "Astro",
        },
        {
          icon: "devicon:react",
          name: "React",
        },
      ],
    },
    {
      name: "Technologies",
      items: [
        {
          icon: "devicon:javascript",
          name: "JavaScript",
        },
        {
          icon: "devicon:typescript",
          name: "TypeScript",
        },
        {
          icon: "devicon:sass",
          name: "Sass",
        },
        {
          icon: "devicon:css3",
          name: "CSS",
        },
        {
          icon: "devicon:html5",
          name: "HTML",
        },

        {
          icon: "devicon:bash",
          name: "Bash",
          invert: true,
        },
        {
          icon: "devicon:openapi",
          name: "OpenAPI",
        },
        {
          icon: "devicon:git",
          name: "Git",
        },
        {
          icon: "devicon:docker",
          name: "Docker",
        },
        {
          icon: "devicon:k6",
          name: "k6",
        },
      ],
    },
    {
      name: "Libraries",
      items: [
        {
          icon: "devicon:jquery",
          name: "jQuery",
        },
        {
          icon: "devicon:socketio",
          name: "Socket.IO",
          invert: true,
        },

        {
          icon: "devicon:bootstrap",
          name: "Bootstrap",
        },

        {
          icon: "devicon:knexjs",
          name: "Knex.js",
        },
        {
          icon: "devicon:tailwindcss",
          name: "TailwindCSS",
        },
      ],
    },
    {
      name: "Servers",
      items: [
        {
          icon: "devicon:linux",
          name: "Linux",
        },
        {
          icon: "devicon:mysql",
          name: "SQL",
        },
        {
          icon: "devicon:redis",
          name: "Redis",
        },
        {
          icon: "devicon:mongodb",
          name: "MongoDB",
        },
        {
          icon: "devicon:traefikproxy",
          name: "Traefik",
        },
      ],
    },
    {
      name: "Runtimes",
      items: [
        {
          icon: "devicon:arduino",
          name: "Arduino",
        },
        {
          icon: "devicon:nodejs",
          name: "Node",
        },
        {
          icon: "devicon:denojs",
          name: "Deno",
          invert: true,
        },
        {
          icon: "devicon:bun",
          name: "Bun",
        },
        {
          icon: "devicon:php",
          name: "PHP",
        },
        {
          icon: "devicon:csharp",
          name: "C#",
        },
        {
          icon: "devicon:go",
          name: "Go",
        },
        {
          icon: "devicon:python",
          name: "Python",
        },
        {
          icon: "devicon:ruby",
          name: "Ruby",
        },
        {
          icon: "devicon:swift",
          name: "Swift",
        },
        {
          icon: "devicon:java",
          name: "Java",
        },
        {
          icon: "devicon:dart",
          name: "Dart",
        },
        {
          icon: "devicon:cplusplus",
          name: "C++",
        },
        {
          icon: "devicon:dot-net",
          name: ".NET",
        },
        {
          icon: "devicon:kotlin",
          name: "Kotlin",
        },
      ],
    },
    {
      name: "Cloud",
      items: [
        {
          icon: "devicon:figma",
          name: "Figma",
        },
        {
          icon: "devicon:appwrite",
          name: "Appwrite",
        },
        {
          icon: "devicon:jenkins",
          name: "Jenkins",
        },
        {
          icon: "devicon:travis",
          name: "Travis",
        },
        {
          icon: "devicon:vercel",
          name: "Vercel",
          invert: true,
        },
        {
          icon: "devicon:digitalocean",
          name: "DigitalOcean",
        },
        {
          icon: "devicon:cloudflare",
          name: "Cloudflare",
        },
        {
          icon: "devicon:netlify",
          name: "Netlify",
        },
        {
          icon: "devicon:railway",
          name: "Railway",
        },

        {
          icon: "devicon:sentry",
          name: "Sentry",
        },
      ],
    },
  ],

  seo: {
    title: "Matej Bačo",
    description:
      "I am impact-driven software engineer from Czech Republic in love with everything open source.",
    image: "/logo.webp",
  },
};

// About (/about)
export const aboutPageContent: AboutPageContent = {
  seo: {
    title: "About | Matej Bačo",
    description: "How I grew into who I am today.",
    image: "/logo.webp",
  },
  work: {
    items: [
      {
        title: "Software lead",
        company: {
          name: "Appwrite",
          image: "/appwrite.svg",
          url: "https://appwrite.io/",
        },
        date: "Oct 2024 - Present",
      },
      {
        title: "Software engineer",
        company: {
          name: "Appwrite",
          image: "/appwrite.svg",
          url: "https://appwrite.io/",
        },
        date: "Aug 2021 - Oct 2024",
      },
      {
        title: "Fullstack developer",
        company: {
          name: "Freelance",
          image: "/logo.webp",
          url: "https://github.com/meldiron",
        },
        date: "Jun 2020 - Aug 2021",
      },
    ],
  },
  connect: {
    links: [
      {
        title: "Discord",
        url: "https://discord.com/channels/@me/287294735054274560/",
        icon: "logos:discord-icon",
        external: true,
      },
      {
        title: "GitHub",
        url: "https://github.com/meldiron",
        icon: "mdi:github",
        external: true,
      },
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/matejbaco/",
        icon: "logos:linkedin-icon",
        external: true,
      },
      {
        title: "Mail",
        url: "mailto:matejbaco2000@gmail.com",
        icon: "logos:google-gmail",
      },
    ],
  },
};

// Projects (/projects)
export const projectsPageContent: ProjectPageContent = {
  seo: {
    title: "Projects | Matej Bačo",
    description: "Check out what I've been working on.",
    image: "/logo.webp",
  },
};

// Blog (/blog)
export const blogPageContent: BlogPageContent = {
  seo: {
    title: "Blog | Matej Bačo",
    description: "Articles I write in free time, and for employers.",
    image: "/logo.webp",
  },
};
