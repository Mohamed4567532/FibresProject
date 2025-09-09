export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: number;
  duration?: string;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: Date;
  image: string;
  tags: string[];
  category: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  expertise: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  image: string;
  date: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  service: string;
}
