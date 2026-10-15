import { useEffect, useState } from "react";
import useTranslate from "../hooks/useTranslate";

export default function Translate({ children }) {
  const { translate, language } = useTranslate();

  const [value, setValue] = useState(children);

  useEffect(() => {
    async function run() {
      const result = await translate(children);

      setValue(result);
    }

    run();
  }, [language, children]);

  return value;
}
