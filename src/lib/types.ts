export type Social = {
  name: string;
  url: string;
  icon: string; // Name of lucide icon
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number; // 1-5
  image: string;
  categoryId: string;
  stallNumber: number;
  'data-ai-hint'?: string;
};

export type Stall = {
  stallNumber: number;
  name: string;
  description: string;
  owner: string;
};

export type MelaData = {
  eventName: string;
  tagline: string;
  eventDate: string; // ISO string
  about: {
      title: string;
      content: string;
  };
  contact: {
      email: string;
      phone: string;
      socials: Social[];
  };
  categories: Category[];
  products: Product[];
  stalls: Stall[];
};
