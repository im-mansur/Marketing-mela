import type { MelaData } from '@/lib/types';

export const defaultMelaData: MelaData = {
  logoUrl: "/logo.png",
  eventName: "Marketing Mela",
  tagline: "Catch the Craze – See What's Coming Tomorrow!",
  eventDate: "", // This will be set dynamically in the useMelaData hook
  about: {
    title: "About Marketing Mela",
    content: "Marketing Mela is the flagship event of Nehru Group of Institutions, celebrating creativity, innovation, and the spirit of entrepreneurship. It's a platform for students to showcase their marketing prowess, from product creation to promotion. Join us for a day of fun, food, and fantastic finds!"
  },
  contact: {
    email: "contact@marketing-mela-ngi.com",
    phone: "+91 123 456 7890",
    socials: [
      { name: "Facebook", url: "#", icon: "Facebook" },
      { name: "Instagram", url: "#", icon: "Instagram" },
      { name: "Twitter", url: "#", icon: "Twitter" },
    ]
  },
  footer: {
    line1: `Built by students, for students. © ${new Date().getFullYear()} Nehru Group of Institutions.`,
    line2Prefix: "Powered by ",
    line2LinkText: "arketing Mela",
  },
  categories: [
    { id: 'food', name: 'Food', emoji: '🍔' },
    { id: 'handmade', name: 'Handmade', emoji: '🎨' },
    { id: 'fashion', name: 'Fashion', emoji: '👗' },
    { id: 'games', name: 'Games', emoji: '🎮' },
  ],
  stalls: [
    { stallNumber: 1, name: "Burger Bliss", description: "The juiciest burgers on campus.", owner: "Rohan & Priya" },
    { stallNumber: 2, name: "Crafty Corner", description: "Unique handmade crafts and gifts.", owner: "Anjali" },
    { stallNumber: 3, name: "Style Hub", description: "Trending fashion accessories.", owner: "Vikram" },
    { stallNumber: 6, name: "Game On!", description: "Fun games with exciting prizes.", owner: "Amit & Tina" },
  ],
  products: [
    { id: 'prod1', name: "Mega Burger", description: "A double-patty burger with all the fixings.", price: 150, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'food', stallNumber: 1, 'data-ai-hint': 'delicious burger' },
    { id: 'prod3', name: "Dream Catcher", description: "Hand-woven dream catcher with beads.", price: 250, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'handmade', stallNumber: 2, 'data-ai-hint': 'handmade dreamcatcher' },
    { id: 'prod5', name: "Boho Earrings", description: "Stylish earrings with a bohemian vibe.", price: 120, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'fashion', stallNumber: 3, 'data-ai-hint': 'boho earrings' },
    { id: 'prod11', name: "Ring Toss", description: "Test your aim and win a prize.", price: 30, rating: 4, image: "https://placehold.co/600x400.png", categoryId: 'games', stallNumber: 6, 'data-ai-hint': 'ring toss' },
  ]
};
