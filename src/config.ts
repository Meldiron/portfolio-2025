import type {
  NavBarLink,
  SocialLink,
  Identity,
  AboutPageContent,
  ProjectPageContent,
  BlogPageContent,
  HomePageContent,
} from "./types/config";

export const identity: Identity = {
  name: "Matej Bačo",
  logo: "/logo.webp",
  email: "tim@witzdam.com",
};

export const navBarLinks: NavBarLink[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "Blog",
    url: "/blog",
  },
];

export const socialLinks: SocialLink[] = [
  {
    title: "Discord",
    url: "https://discord.com/channels/@me/287294735054274560/",
    icon: "mdi:discord",
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
    icon: "mdi:linkedin",
    external: true,
  },
  {
    title: "Mail",
    url: "mailto:matejbaco2000@gmail.com",
    icon: "mdi:email",
  },
];

// Home (/)
export const homePageContent: HomePageContent = {
  techstack: [
    {
      icon: "devicon:java",
      name: "Java",
    },
    {
      icon: "devicon:java",
      name: "Java",
    },
    {
      icon: "devicon:java",
      name: "Java",
    },
  ],
  seo: {
    title: "Matej Bačo",
    description:
      "Full time student from Germany who loves building cool things using code.",
    image: identity.logo,
  },
  role: "Engineering Lead",
};

// About (/about)
export const aboutPageContent: AboutPageContent = {
  seo: {
    title: "About | Matej Bačo",
    description:
      "Full time student from Germany who loves building cool things using code.",
    image: identity.logo,
  },
  subtitle: "Some information about myself",
  about: {
    description: `
I'm Matej Bačo, a full time student from Germany who also loves building cool things using code.
<br/><br/>
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque placeat est architecto tempora voluptatem sit suscipit aspernatur? <br/><br/>
Facere quibusdam reiciendis, distinctio sunt praesentium error accusantium consectetur nemo vero officia itaque.`, // Markdown is supported
    image_l: {
      url: "/demo-1.jpg",
      alt: "Left Picture",
    },
    image_r: {
      url: "/demo-1.jpg",
      alt: "Right Picture",
    },
  },
  work: {
    description:
      "Since the day one I worked remotely, which made me disciplined, open-minded, and time-flexible individual.",
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
    description: `I'm always interested in meeting new people and learning new things. Feel free to connect with me on any of the following platforms.`, // Markdown is supported
    links: socialLinks,
  },
};

// Projects (/projects)
export const projectsPageContent: ProjectPageContent = {
  seo: {
    title: "Projects | Matej Bačo",
    description: "Check out what I've been working on.",
    image: identity.logo,
  },
  subtitle: "Check out what I've been working on.",
  projects: [
    {
      title: "Project 1",
      description: "Project 1 Description",
      image: "/demo-2.jpg",
      year: "2024",
      url: "https://github.com/meldiron",
    },
    {
      title: "Project 1",
      description: "Project 1 Description",
      image: "/demo-2.jpg",
      year: "2024",
      url: "https://github.com/meldiron",
    },
    {
      title: "Project 1",
      description: "Project 1 Description",
      image: "/demo-2.jpg",
      year: "2024",
      url: "https://github.com/meldiron",
    },
  ],
};

// Blog (/blog)
export const blogPageContent: BlogPageContent = {
  seo: {
    title: "Blog | Matej Bačo",
    description: "Articles I write in free time, and for employers.",
    image: identity.logo,
  },
  subtitle: "Articles I write in free time, and for employers.",
};
