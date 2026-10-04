import { Profile } from "@/lib/types";

const portrait = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&h=1200&q=85`;

export const DEMO_PROFILES: Profile[] = [
  {
    id: "1",
    name: "Sofia",
    age: 26,
    bio: "Coffee addict ☕ | Travel lover ✈️ | Looking for someone to explore the city with",
    location: "Lagos",
    photos: [
      portrait("photo-1644152993066-9b9ee687930d"),
      portrait("photo-1620176692803-8789577394e2"),
    ],
    interests: ["Travel", "Coffee", "Photography", "Yoga"],
    distance: 3,
  },
  {
    id: "2",
    name: "Amara",
    age: 24,
    bio: "Creative soul 🎨 | Music is my love language | Let's talk about your favorite albums",
    location: "Abuja",
    photos: [
      portrait("photo-1602342323893-b11f757957c9"),
      portrait("photo-1632612721400-0a337458b7ed"),
    ],
    interests: ["Art", "Music", "Fashion", "Dancing"],
    distance: 8,
  },
  {
    id: "3",
    name: "Chioma",
    age: 28,
    bio: "Fitness enthusiast 💪 | Foodie at heart | Looking for genuine connections",
    location: "Lagos",
    photos: [
      portrait("photo-1620424037570-15137a4a562d"),
      portrait("photo-1606866020014-a3ef11efdc37"),
    ],
    interests: ["Fitness", "Cooking", "Movies", "Hiking"],
    distance: 5,
  },
  {
    id: "4",
    name: "Zara",
    age: 25,
    bio: "Bookworm 📚 | Sunset chaser 🌅 | Let's grab drinks and talk about everything",
    location: "Port Harcourt",
    photos: [
      portrait("photo-1725461563524-99f88dafeb4c"),
      portrait("photo-1641472364272-a054db0760fe"),
    ],
    interests: ["Reading", "Wine", "Beach", "Podcasts"],
    distance: 12,
  },
  {
    id: "5",
    name: "Ngozi",
    age: 27,
    bio: "Entrepreneur 💼 | Adventure seeker | Looking for someone ambitious and kind",
    location: "Lagos",
    photos: [
      portrait("photo-1593351799227-75df2026356b"),
      portrait("photo-1663117172617-dada4103ecb3"),
    ],
    interests: ["Business", "Travel", "Networking", "Gym"],
    distance: 2,
  },
  {
    id: "6",
    name: "Aisha",
    age: 23,
    bio: "Tech girl 👩‍💻 | Anime lover | Can talk about startups or Studio Ghibli for hours",
    location: "Ibadan",
    photos: [
      portrait("photo-1632612721495-b201b62b786c"),
      portrait("photo-1688841167159-bed18ddaeb44"),
    ],
    interests: ["Tech", "Anime", "Gaming", "Coffee"],
    distance: 15,
  },
  {
    id: "7",
    name: "Tolu",
    age: 29,
    bio: "Photographer 📸 | Nature lover | Let's create memories together",
    location: "Lagos",
    photos: [
      portrait("photo-1561406636-b80293969660"),
      portrait("photo-1783013958986-09185193cae4"),
    ],
    interests: ["Photography", "Nature", "Hiking", "Dogs"],
    distance: 4,
  },
  {
    id: "8",
    name: "Blessing",
    age: 26,
    bio: "Nurse by day, dancer by night 💃 | Looking for laughter and good vibes only",
    location: "Enugu",
    photos: [
      portrait("photo-1658497729730-1aa2fa2728da"),
      portrait("photo-1724744014251-3ed158125a2d"),
    ],
    interests: ["Dancing", "Healthcare", "Food", "Friends"],
    distance: 9,
  },
];
