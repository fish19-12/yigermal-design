import FashionGalleryLayout from "../../components/FashionGalleryLayout";
import { FaFemale } from "react-icons/fa";

const ChiffonGallery = () => {
  return (
    <FashionGalleryLayout
      title="Habesha"
      highlight="Women"
      badge="Women's Habesha Collection"
      icon={<FaFemale />}
      category="Women"
    />
  );
};

export default ChiffonGallery;
