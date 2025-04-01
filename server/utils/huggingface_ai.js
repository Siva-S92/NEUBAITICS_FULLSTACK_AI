import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Hugging Face API URL and token
const API_URL = 'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment';
const API_TOKEN = process.env.Huggingface_Token; // Replace with your Hugging Face API token

// Map model labels to human-readable sentiment labels
const labelMapping = {
  'LABEL_0': 'NEGATIVE',  // LABEL_0 corresponds to NEGATIVE
  'LABEL_1': 'NEUTRAL',   // LABEL_1 corresponds to NEUTRAL
  'LABEL_2': 'POSITIVE',  // LABEL_2 corresponds to POSITIVE
};

async function analyzeSentiment(text) {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    // Get the highest score label
    const sortedLabels = response.data[0].sort((a, b) => b.score - a.score);
    const highestLabel = sortedLabels[0]; // The label with the highest score

    // Map the model's label to human-readable sentiment
    const sentiment = labelMapping[highestLabel.label];

    return {
      label: sentiment,  // 'POSITIVE', 'NEGATIVE', or 'NEUTRAL'
      score: highestLabel.score,  // Confidence score
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error.response ? error.response.data : error.message);
    return { error: 'Failed to analyze sentiment' };
  }
}

export default analyzeSentiment;
