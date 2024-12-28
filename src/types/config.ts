export type NavBarLink = {
  title: string;
  url: string;
  external?: boolean;
};

export type SocialLink = {
  title: string;
  url: string;
  icon: string;
  external?: boolean;
};

export type Identity = {
  name: string;
  logo: string;
  email: string;
};

export type SEOInfo = {
  title: string;
  description: string;
  image: string;
};

export type HomePageContent = {
  seo: SEOInfo;
  techstack: TechStackItem[];
  role: string;
  description: string;
};

export type TechStackItem = {
  icon: string;
  name: string;
};

export type ResumeItem = {
  title: string;
  company: {
    name: string;
    image: string;
    url: string;
  };
  date: string;
};

export type AboutPageContent = {
  seo: SEOInfo;
  subtitle: string;
  about: {
    description: string;
    image_l: {
      url: string;
      alt: string;
    };
    image_r: {
      url: string;
      alt: string;
    };
  };
  work: {
    description: string;
    items: ResumeItem[];
  };
  connect: {
    description: string;
    links: SocialLink[];
  };
};

export type Project = {
  title: string;
  description: string;
  image: string;
  year: string;
  url: string;
};

export type ProjectPageContent = {
  seo: SEOInfo;
  subtitle: string;
  projects: Project[];
};

export type BlogPageContent = {
  seo: SEOInfo;
  subtitle: string;
};
