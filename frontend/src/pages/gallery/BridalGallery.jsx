import FashionGalleryLayout from "../../components/FashionGalleryLayout";
import { FaHeart } from "react-icons/fa";

const BridalGallery = () => {
  return (
    <FashionGalleryLayout
      title="Habesha"
      highlight="Couples"
      badge="Habesha Couples Collection"
      icon={<FaHeart />}
      category="Couples"
    />
  );
};

export default BridalGallery;
