import type { MelaData } from '@/lib/types';

export const defaultMelaData: MelaData = {
  eventName: "Marketing Mela",
  tagline: "Catch the Craze – See What's Coming Tomorrow!",
  eventDate: "", // This will be set dynamically in the useMelaData hook
  about: {
    title: "About Marketing Mela",
    content: "Marketing Mela is the flagship event of Nehru Group of Institutions, celebrating creativity, innovation, and the spirit of entrepreneurship. It's a platform for students to showcase their marketing prowess, from product creation to promotion. Join us for a day of fun, food, and fantastic finds!"
  },
  contact: {
    email: "contact@melaverse-ngi.com",
    phone: "+91 123 456 7890",
    socials: [
      { name: "Facebook", url: "#", icon: "Facebook" },
      { name: "Instagram", url: "#", icon: "Instagram" },
      { name: "Twitter", url: "#", icon: "Twitter" },
    ]
  },
  categories: [
    { id: 'food', name: 'Food', emoji: '🍔' },
    { id: 'handmade', name: 'Handmade', emoji: '🎨' },
    { id: 'fashion', name: 'Fashion', emoji: '👗' },
    { id: 'gadgets', name: 'Gadgets', emoji: '📱' },
    { id: 'art', name: 'Art', emoji: '🖼️' },
    { id: 'games', name: 'Games', emoji: '🎮' },
  ],
  stalls: [
    { stallNumber: 1, name: "Burger Bliss", description: "The juiciest burgers on campus.", owner: "Rohan & Priya" },
    { stallNumber: 2, name: "Crafty Corner", description: "Unique handmade crafts and gifts.", owner: "Anjali" },
    { stallNumber: 3, name: "Style Hub", description: "Trending fashion accessories.", owner: "Vikram" },
    { stallNumber: 4, name: "Tech Zone", description: "Coolest gadgets and tech accessories.", owner: "Sameer" },
    { stallNumber: 5, name: "Art Arena", description: "Beautiful paintings and sketches.", owner: "Meera" },
    { stallNumber: 6, name: "Game On!", description: "Fun games with exciting prizes.", owner: "Amit & Tina" },
    { stallNumber: 7, name: "Sweet Treats", description: "Delicious desserts and pastries.", owner: "Sunita" },
  ],
  products: [
    { id: 'prod1', name: "Mega Burger", description: "A double-patty burger with all the fixings.", price: 150, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'food', stallNumber: 1, 'data-ai-hint': 'delicious burger' },
    { id: 'prod2', name: "Cheesy Fries", description: "Crispy fries loaded with cheese sauce.", price: 80, rating: 4, image: "https://placehold.co/600x400.png", categoryId: 'food', stallNumber: 1, 'data-ai-hint': 'cheesy fries' },
    { id: 'prod13', name: "Cupcake Delight", description: "Soft and fluffy cupcakes with frosting.", price: 60, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'food', stallNumber: 7, 'data-ai-hint': 'colorful cupcakes' },
    { id: 'prod3', name: "Dream Catcher", description: "Hand-woven dream catcher with beads.", price: 250, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'handmade', stallNumber: 2, 'data-ai-hint': 'handmade dreamcatcher' },
    { id: 'prod4', name: "Friendship Bracelets", description: "Colorful bracelets for your bestie.", price: 50, rating: 4, image: "https://placehold.co/600x400.png", categoryId: 'handmade', stallNumber: 2, 'data-ai-hint': 'friendship bracelets' },
    { id: 'prod5', name: "Boho Earrings", description: "Stylish earrings with a bohemian vibe.", price: 120, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'fashion', stallNumber: 3, 'data-ai-hint': 'boho earrings' },
    { id: 'prod6', name: "Cool Sunglasses", description: "Protect your eyes in style.", price: 200, rating: 4, image: "https://placehold.co/600x400.png", categoryId: 'fashion', stallNumber: 3, 'data-ai-hint': 'cool sunglasses' },
    { id: 'prod7', name: "Portable Charger", description: "Never run out of battery again.", price: 500, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'gadgets', stallNumber: 4, 'data-ai-hint': 'portable charger' },
    { id: 'prod8', name: "Phone Stand", description: "A handy stand for your smartphone.", price: 150, rating: 3, image: "https://placehold.co/600x400.png", categoryId: 'gadgets', stallNumber: 4, 'data-ai-hint': 'phone stand' },
    { id: 'prod9', name: "Sunset Painting", description: "A beautiful acrylic painting of a sunset.", price: 800, rating: 5, image: "https://placehold.co/600x400.png", categoryId: 'art', stallNumber: 5, 'data-ai-hint': 'sunset painting' },
    { id: 'prod10', name: "Charcoal Sketch", description: "Custom charcoal sketches on demand.", price: 400, rating: 4, image: "https://placehold.co/600x400.png", categoryId: 'art', stallNumber: 5, 'data-ai-hint': 'charcoal sketch' },
    { id: 'prod11', name: "Ring Toss", description: "Test your aim and win a prize.", price: 30, rating: 4, image: "https://placehold.co/600x400.png", categoryId: 'games', stallNumber: 6, 'data-ai-hint': 'ring toss' },
    { id: 'prod12', name: "Lucky Draw", description: "Try your luck to win a grand prize.", price: 50, rating: 3, image: "https://placehold.co/600x400.png", categoryId: 'games', stallNumber: 6, 'data-ai-hint': 'lucky draw' },
  ]
};
