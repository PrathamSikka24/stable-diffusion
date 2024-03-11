const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3000;
require("dotenv").config();

const apiKey = process.env.apiKey;

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/generate", async (req, res) => {
  const userPrompt = req.body.prompt;
  try {
    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image",
      {
        cfg_scale: 7,
        clip_guidance_preset: "FAST_BLUE",
        height: 512,
        width: 512,
        sampler: "K_DPM_2_ANCESTRAL",
        samples: 1,
        steps: 30,
        text_prompts: [{ text: userPrompt, weight: 1 }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const base64Image = response.data.artifacts[0].base64;
    res.json({ image: base64Image });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error generating image");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
