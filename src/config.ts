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
      name: "Frontend",
      items: [
        {
          icon: "devicon:svelte",
          name: "Svelte",
        },
        {
          icon: "__ASTRO__",
          name: "Astro",
        },
        {
          icon: "devicon:nextjs",
          name: "Next.js",
        },
        {
          icon: "devicon:remix",
          name: "Remix",
          invert: true,
        },
        {
          icon: "devicon:nuxtjs",
          name: "Nuxt",
        },
        {
          icon: "devicon:angular",
          name: "Angular",
        },
        {
          icon: "devicon:htmx",
          name: "HTMX",
        },
        {
          icon: "devicon:alpinejs",
          name: "Alpine.js",
        },
        {
          icon: "devicon:tailwindcss",
          name: "TailwindCSS",
        },
      ],
    },
    {
      name: "Backend",
      items: [
        {
          icon: "devicon:php",
          name: "PHP",
        },
        {
          icon: "devicon:go",
          name: "Go",
        },
        {
          icon: "devicon:bun",
          name: "Bun",
        },
        {
          icon: "devicon:nodejs",
          name: "Node",
        },
        {
          icon: "devicon:python",
          name: "Python",
        },
      ],
    },
    {
      name: "Database",
      items: [
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
          icon: "devicon:appwrite",
          name: "Appwrite",
        },
      ],
    },
    {
      name: "Platform",
      items: [
        {
          icon: "devicon:docker",
          name: "Docker",
        },
        {
          icon: "devicon:kubernetes",
          name: "Kubernetes",
        },
        {
          icon: "devicon:rabbitmq",
          name: "RabbitMQ",
        },
        {
          icon: "devicon:traefikproxy",
          name: "Traefik",
        },
        {
          icon: "devicon:cloudflare",
          name: "Cloudflare",
        },
      ],
    },
    {
      name: "Entertainment",
      items: [
        {
          icon: "devicon:jamstack",
          name: "Jamstack",
        },
        {
          icon: "devicon:unity",
          name: "Unity",
        },
        {
          icon: "devicon:lua",
          name: "Lua",
        },
        {
          icon: "devicon:arduino",
          name: "Arduino",
        },
      ],
    },
    /*
    
    ,
    ,
    {
      icon: "devicon:javascript",
      name: "JavaScript",
    },
    {
      icon: "devicon:typescript",
      name: "TypeScript",
    }
    
    
    ,
    
   Frameworks
   Technologies
   Libraries
   Servers
     */
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
        title: "E-mail",
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
