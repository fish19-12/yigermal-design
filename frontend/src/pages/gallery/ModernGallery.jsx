import FashionGalleryLayout from "../../components/FashionGalleryLayout";
import { FaUsers } from "react-icons/fa";

const ModernGallery = () => {
  return (
    <FashionGalleryLayout
      title="Habesha"
      highlight="Family"
      badge="Habesha Family Collection"
      icon={<FaUsers />}
      category="Family"
    />
  );
};

export default ModernGallery;
