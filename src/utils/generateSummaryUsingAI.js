import axios from "axios";

const generateSummaryUsingAI = async (content) => {
  const url =
    "https://api-inference.huggingface.co/models/tuner007/pegasus_summarizer";

  const data = { inputs: content };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_TOKEN_HUGGING_FACE}`,
      },
    });

    return response.data[0].summary_text;
  } catch (error) {
    console.error("Failed to generate summary using AI:", error);
    throw new Error("Failed to generate summary using AI");
  }
};

export default generateSummaryUsingAI;
