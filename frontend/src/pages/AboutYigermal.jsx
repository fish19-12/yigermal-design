import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaFemale,
  FaUserTie,
  FaHeart,
  FaUsers,
  FaRuler,
  FaGlobeAfrica,
  FaQuoteLeft,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";
import ceoPhoto from "../assets/ceo.jpg";

const content = {
  EN: {
    eyebrow: "ABOUT YIGERMAL DESIGN",
    title: "Celebrating Habesha tradition.",
    accent: "Crafted for your story.",
    intro:
      "We bring Ethiopian and Habesha clothing to life through thoughtful design, beautiful embroidery, and careful tailoring. Each piece honors our heritage while making room for modern style, comfort, and individuality.",
    founderLabel: "FOUNDER & CEO",
    founder: "Yigerm Sitotaw",
    founderCopy:
      "Founded by Yigerm Sitotaw, Yigermal Design is built on a simple idea: traditional clothing should feel personal, beautifully made, and ready for the moments that matter. We work closely with each customer to turn their ideas and measurements into clothing they feel proud to wear.",
    founderNote: "Tradition in every thread. Elegance in every detail.",
    collectionEyebrow: "MADE FOR YOUR MOMENTS",
    collectionTitle: "Clothing with a connection.",
    collectionIntro:
      "From individual pieces to coordinated looks, each design is made to celebrate your people, your culture, and your occasion.",
    categories: [
      {
        icon: FaFemale,
        number: "01",
        title: "Women's wear",
        text: "Elegant Habesha dresses with expressive embroidery and refined finishing.",
      },
      {
        icon: FaUserTie,
        number: "02",
        title: "Men's wear",
        text: "Traditional outfits shaped with a confident, contemporary touch.",
      },
      {
        icon: FaHeart,
        number: "03",
        title: "Couple collections",
        text: "Coordinated styles for weddings, celebrations, and shared occasions.",
      },
      {
        icon: FaUsers,
        number: "04",
        title: "Family collections",
        text: "Complementary looks that bring the whole family together in style.",
      },
    ],
    missionEyebrow: "OUR PURPOSE",
    missionTitle: "Keeping culture close, wherever life takes you.",
    missionCopy:
      "Our mission is to celebrate Habesha heritage through quality traditional clothing, personal design, and careful craftsmanship. Whether you are in Ethiopia, Dubai, or elsewhere in the world, we make it easier to choose a design, share your measurements, and create something that feels like yours.",
    processTitle: "Made around you",
    process: [
      "Choose a design",
      "Share your measurements",
      "We create your piece",
    ],
    promiseEyebrow: "OUR PROMISE",
    promise:
      "A garment is more than what you wear. It carries identity, connection, memory, and pride. We make each piece with care, so you can carry your tradition in your own way.",
    cta: "Explore the collection",
  },
  AM: {
    eyebrow: "ስለ YIGERMAL DESIGN",
    title: "የሐበሻ ባህልን በውበት።",
    accent: "ለእርስዎ ታሪክ የተዘጋጀ።",
    intro:
      "የኢትዮጵያንና የሐበሻን አልባሳት በጥንቃቄ በተዘጋጁ ዲዛይኖች፣ በውብ ጥልፍ ሥራዎችና በጥራት ስፌት ወደ ሕይወት እናመጣለን። እያንዳንዱ ልብስ ባህላችንን እያከበረ ዘመናዊ ዘይቤን፣ ምቾትንና የግል ማንነትን ያጣምራል።",
    founderLabel: "መስራችና ዋና ሥራ አስፈጻሚ",
    founder: "Yigerm Sitotaw",
    founderCopy:
      "Yigermal Design በይገርም ስዮጣው የተመሰረተ ሲሆን፣ ባህላዊ አልባሳት ለግል የተዘጋጁ፣ በጥራት የተሰሩና ለልዩ የሕይወት አጋጣሚዎች የሚሆኑ መሆን አለባቸው በሚል ሀሳብ ይመራል። ከደንበኞች ጋር በቅርበት በመስራት ሀሳባቸውንና መለኪያቸውን በኩራት ሊለብሱት ወደሚችሉት ልብስ እንቀይራለን።",
    founderNote: "ባህል በእያንዳንዱ ክር። ውበት በእያንዳንዱ ዝርዝር።",
    collectionEyebrow: "ለልዩ አጋጣሚዎ",
    collectionTitle: "ከማንነትዎ ጋር የተቆራኙ አልባሳት።",
    collectionIntro:
      "ከግል አልባሳት እስከ ተቀናጁ ዲዛይኖች፣ እያንዳንዱ ልብስ ሰዎችዎን፣ ባህልዎንና አጋጣሚዎን ለማክበር ይዘጋጃል።",
    categories: [
      {
        icon: FaFemale,
        number: "01",
        title: "የሴቶች አልባሳት",
        text: "ውብ ጥልፍና ጥራት ያለው አጨራረስ ያላቸው የሐበሻ ቀሚሶች።",
      },
      {
        icon: FaUserTie,
        number: "02",
        title: "የወንዶች አልባሳት",
        text: "ባህላዊ ዘይቤን ከዘመናዊ ገጽታ ጋር የሚያጣምሩ አልባሳት።",
      },
      {
        icon: FaHeart,
        number: "03",
        title: "የጥንዶች ስብስብ",
        text: "ለሠርግ፣ ለበዓላትና ለጋራ ደስታ የተቀናጁ ዘይቤዎች።",
      },
      {
        icon: FaUsers,
        number: "04",
        title: "የቤተሰብ ስብስብ",
        text: "ቤተሰቡን በአንድነት የሚያሳዩ ተቀናጅተው የተዘጋጁ አልባሳት።",
      },
    ],
    missionEyebrow: "ዓላማችን",
    missionTitle: "ባህልን በቅርብ፣ በየትኛውም ቦታ።",
    missionCopy:
      "ዓላማችን የሐበሻን ባህል በጥራት ባላቸው ባህላዊ አልባሳት፣ በግል ዲዛይንና በጥንቃቄ የተሰራ ሥራ ማክበር ነው። በኢትዮጵያ፣ በዱባይ ወይም በሌላ የዓለም ክፍል ቢሆኑም፣ ዲዛይን መምረጥ፣ መለኪያ መላክና ለእርስዎ የሚስማማ ልብስ ማዘጋጀት እናቀላልለን።",
    processTitle: "ለእርስዎ የተዘጋጀ",
    process: ["ዲዛይን ይምረጡ", "መለኪያዎን ያጋሩ", "ልብስዎን እንዘጋጃለን"],
    promiseEyebrow: "ቃል ኪዳናችን",
    promise:
      "ልብስ የምንለብሰው ጨርቅ ብቻ አይደለም። ማንነትን፣ ትስስርን፣ ትዝታንና ኩራትን ይወክላል። ባህልዎን በራስዎ መንገድ እንዲያንጸባርቁ እያንዳንዱን ልብስ በጥንቃቄ እንሰራለን።",
    cta: "ስብስቡን ይመልከቱ",
  },
};

const AboutYigermal = () => {
  const { language } = useLanguage();
  const copy = content[language?.toUpperCase()] || content.EN;

  return (
    <main className="overflow-hidden bg-[#fffaf8] text-[#211d1c]">
      <section className="border-b border-[#f0dce2] bg-[#fff7fa] px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="order-2 lg:order-1"
          >
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#a8445d] sm:text-xs">
              <span className="h-px w-7 bg-[#a8445d]" />
              {copy.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              {copy.title}
              <span className="mt-1 block text-[#c34f70]">{copy.accent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#6c5d5b] sm:text-lg">
              {copy.intro}
            </p>
            <p className="mt-4 max-w-2xl border-l-2 border-[#d47a56] pl-4 text-sm leading-relaxed text-[#775d60] sm:text-base">
              {copy.founderCopy}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {copy.categories.map((category) => (
                <span
                  key={category.number}
                  className="rounded-full border border-[#ead5da] bg-white px-3 py-1.5 text-xs font-medium text-[#775d60] sm:px-4 sm:py-2 sm:text-sm"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative order-1 mx-auto w-full max-w-lg lg:order-2"
          >
            <div className="absolute -left-3 -top-3 h-20 w-20 border-l-2 border-t-2 border-[#d47a56] sm:-left-5 sm:-top-5 sm:h-28 sm:w-28" />
            <img
              src={ceoPhoto}
              alt={
                language === "AM"
                  ? "ይገርም ስዮጣው፣ መስራችና ዋና ሥራ አስፈጻሚ"
                  : "Yigerm Sitotaw, Founder and CEO of Yigermal Design"
              }
              className="relative aspect-[4/4.4] w-full rounded-md border border-white object-cover object-center shadow-2xl"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 rounded-sm bg-white/95 p-4 shadow-md backdrop-blur-sm sm:inset-x-5 sm:bottom-5 sm:p-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a8445d] sm:text-[10px]">
                  {copy.founderLabel}
                </p>
                <p className="mt-1 text-lg font-semibold sm:text-xl">
                  {copy.founder}
                </p>
              </div>
              <FaQuoteLeft
                className="mb-1 shrink-0 text-xl text-[#d47a56]"
                aria-hidden="true"
              />
            </figcaption>
            <div className="mt-4 border-l-2 border-[#d47a56] pl-4 font-serif text-base italic text-[#775d60] sm:text-lg">
              {copy.founderNote}
            </div>
          </motion.figure>
        </div>
      </section>

      <section className="border-y border-[#f0dce2] bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a8445d] sm:text-xs">
              {copy.collectionEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl">
              {copy.collectionTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#766b68] sm:text-base">
              {copy.collectionIntro}
            </p>
          </div>

          <div className="mt-9 grid gap-x-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {copy.categories.map((category) => (
              <motion.article
                key={category.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="border-t border-[#e9dfdc] py-5 sm:py-6"
              >
                <div className="flex items-center justify-between">
                  <category.icon
                    className="text-xl text-[#a8445d]"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-sm text-[#b6a3a0]">
                    {category.number}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-medium sm:text-2xl">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#766b68]">
                  {category.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7ecea] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a8445d] sm:text-xs">
              {copy.missionEyebrow}
            </p>
            <h2 className="mt-3 max-w-md font-serif text-3xl font-medium leading-tight sm:text-4xl">
              {copy.missionTitle}
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-[#5e504e] sm:text-lg">
              {copy.missionCopy}
            </p>
            <h3 className="mt-8 text-[10px] font-bold uppercase tracking-[0.17em] text-[#a8445d] sm:text-xs">
              {copy.processTitle}
            </h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {copy.process.map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-3 border-t border-[#dcc6c3] pt-3 text-sm font-medium text-[#4e4140]"
                >
                  <span className="font-serif text-lg text-[#a8445d]">
                    0{index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-[#e9dfdc] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a8445d] sm:text-xs">
              {copy.promiseEyebrow}
            </p>
            <p className="mt-3 font-serif text-2xl font-medium leading-snug sm:text-3xl">
              {copy.promise}
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-sm bg-[#a8445d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#87354a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8445d]"
          >
            {copy.cta}
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutYigermal;
