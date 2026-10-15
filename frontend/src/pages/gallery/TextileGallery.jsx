import FashionGalleryLayout from "../../components/FashionGalleryLayout";
import { FaChild } from "react-icons/fa";

const TextileGallery = () => {
  return (
    <FashionGalleryLayout
      title="Little"
      highlight="Habesha"
      badge="Habesha Children's Collection"
      icon={<FaChild />}
      category="Children"
    />
  );
};

export default TextileGallery;
