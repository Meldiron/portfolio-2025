// Project banners are rendered by tools/illustrations in three sizes next to each other:
//   /projects/illustrations/<slug>.webp        1600 x 840, the project page cover
//   /projects/illustrations/<slug>-card.webp    600 x 320, the home carousel card (300 x 160 at 2x)
//   /projects/illustrations/<slug>-strip.webp  1184 x 420, the project list card (592 x 210 at 2x)
//   /projects/illustrations/<slug>-og.jpg      1200 x 630, the Open Graph image
// Frontmatter only names the cover; these helpers find the other sizes. Covers from elsewhere are returned unchanged.
const BANNERS = /^\/projects\/illustrations\/[^/]+\.webp$/;

export function bannerSize(coverUrl: string, size: "card" | "strip" | "og"): string {
  if (!BANNERS.test(coverUrl)) return coverUrl;
  return size === "og" ? coverUrl.replace(/\.webp$/, "-og.jpg") : coverUrl.replace(/\.webp$/, `-${size}.webp`);
}
