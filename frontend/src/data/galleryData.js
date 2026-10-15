// src/data/galleryData.js

import womenImage from "../assets/womens.jpg";
import menImage from "../assets/mens.jpg";
import couplesImage from "../assets/copule.jpg";
import familyImage from "../assets/family.jpg";

export const collections = [
  {
    id: "women",
    title: "Habesha Women",
    category: "Women",
    image: womenImage,
    link: "/gallery/women",
  },
  {
    id: "men",
    title: "Habesha Men",
    category: "Men",
    image: menImage,
    link: "/gallery/men",
  },
  {
    id: "couples",
    title: "Habesha Couples",
    category: "Couples",
    image: couplesImage,
    link: "/gallery/couples",
  },
  {
    id: "family",
    title: "Habesha Family",
    category: "Family",
    image: familyImage,
    link: "/gallery/family",
  },
];

export const galleryItems = [
  {
    id: 1,
    category: "Women",
    name: "Traditional Habesha Dress",
    image: womenImage,
  },
  {
    id: 2,
    category: "Men",
    name: "Habesha Men's Formal Look",
    image: menImage,
  },
  {
    id: 3,
    category: "Couples",
    name: "Celebration Couple Style",
    image: couplesImage,
  },
  {
    id: 4,
    category: "Family",
    name: "Family Celebration Style",
    image: familyImage,
  },
];
