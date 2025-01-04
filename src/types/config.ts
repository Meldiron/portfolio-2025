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

export type SEOInfo = {
  title: string;
  description: string;
  image: string;
};

export type HomePageContent = {
  seo: SEOInfo;
  techstack: TechStackItem[];
};

export type TechStackItem = {
  icon: string;
  name: string;
  invert?: boolean;
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
  work: {
    items: ResumeItem[];
  };
  connect: {
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
};

export type BlogPageContent = {
  seo: SEOInfo;
};
