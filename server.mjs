import express from 'express';
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 4000; // Choose any port number you prefer

app.use(express.json());
app.use(cors());

app.post('/api', async (req, res) => {
  const userMessage = req.body.user_question;
  const API_URL = "https://people-analytics-jine.hf.space/chatbot/";

  const myHeaders = new fetch.Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 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");

  const raw = JSON.stringify({
    "user_question": userMessage
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    res.json({ chatbot_response: data.chatbot_response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops! Something went wrong. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

