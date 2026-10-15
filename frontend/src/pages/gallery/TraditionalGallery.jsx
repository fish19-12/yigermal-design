import FashionGalleryLayout from "../../components/FashionGalleryLayout";
import { FaUserTie } from "react-icons/fa";

const TraditionalGallery = () => {
  return (
    <FashionGalleryLayout
      title="Habesha"
      highlight="Men"
      badge="Men's Habesha Collection"
      icon={<FaUserTie />}
      category="Men"
    />
  );
};

export default TraditionalGallery;
