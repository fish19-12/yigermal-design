const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function translateText(text, targetLanguage) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const prompt = `

You are a website translation engine.

Translate this text into ${targetLanguage}.

Important rules:

1. Return only translated text.
2. Do not explain anything.
3. Do not add quotation marks.
4. Keep company names unchanged.
5. Keep Fiyorina Chiffon exactly as it is.
6. Keep emojis unchanged.
7. Keep formatting.

Text:

${text}

`;

    const result = await model.generateContent(prompt);

    return result.response.text().trim();
  } catch (error) {
    console.log("Gemini Translation Error:", error.message);

    throw error;
  }
}

module.exports = translateText;
