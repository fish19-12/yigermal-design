import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const translateText = async (text, language) => {
  try {
    const response = await axios.post(`${API_URL}/api/translate`, {
      text,
      language,
    });

    return response.data.translation;
  } catch (error) {
    console.error(
      "Translation API Error:",
      error.response?.data || error.message,
    );

    return text;
  }
};
