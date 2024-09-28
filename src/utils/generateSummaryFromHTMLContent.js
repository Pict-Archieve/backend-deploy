import generateSummaryUsingAI from "./generateSummaryUsingAI.js";
import generateTextFromHTML from "./generateTextFromHTML.js";

const generateSummaryFromHTMLContent = async (htmlContent) => {
  try {
    const summary = await generateSummaryUsingAI(htmlContent);
    return summary;
  } catch (error) {
    console.log("Failed to generate summary");
    return generateTextFromHTML(htmlContent);
  }
};

export default generateSummaryFromHTMLContent;
