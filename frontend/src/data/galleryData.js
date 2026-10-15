// src/data/galleryData.js

import { FaFemale, FaUserTie, FaHeart, FaUsers, FaChild } from "react-icons/fa";

import traditionalImage from "../assets/traditional1.jpg";
import familyImage from "../assets/traditional.jpg";
import celebrationImage from "../assets/bridal.jpg";

export const collections = [
  {
    id: "women",
    title: "Habesha Women",
    category: "Women",
    description:
      "Handcrafted Habesha dresses that bring Ethiopian heritage, intricate embroidery, and modern elegance together.",
    icon: FaFemale,
    image: traditionalImage,
    link: "/gallery/women",
  },
  {
    id: "men",
    title: "Habesha Men",
    category: "Men",
    description:
      "Refined traditional menswear with thoughtful details for celebrations, gatherings, and everyday pride.",
    icon: FaUserTie,
    image: celebrationImage,
    link: "/gallery/men",
  },
  {
    id: "couples",
    title: "Habesha Couples",
    category: "Couples",
    description:
      "Coordinated Ethiopian looks for engagements, weddings, and the moments you celebrate together.",
    icon: FaHeart,
    image: celebrationImage,
    link: "/gallery/couples",
  },
  {
    id: "family",
    title: "Habesha Family",
    category: "Family",
    description:
      "Matching and complementary family outfits made for joyful gatherings and lasting memories.",
    icon: FaUsers,
    image: familyImage,
    link: "/gallery/family",
  },
  {
    id: "children",
    title: "Little Habesha",
    category: "Children",
    description:
      "Comfortable, beautiful traditional pieces for children to join in every special celebration.",
    icon: FaChild,
    image: familyImage,
    link: "/gallery/children",
  },
];

export const galleryItems = [
  {
    id: 1,
    category: "Women",
    name: "Traditional Habesha Dress",
    image: traditionalImage,
  },
  {
    id: 2,
    category: "Men",
    name: "Habesha Men's Formal Look",
    image: celebrationImage,
  },
  {
    id: 3,
    category: "Couples",
    name: "Celebration Couple Style",
    image: celebrationImage,
  },
  {
    id: 4,
    category: "Family",
    name: "Family Celebration Style",
    image: familyImage,
  },
  {
    id: 5,
    category: "Children",
    name: "Little Habesha Celebration Look",
    image: familyImage,
  },
];
