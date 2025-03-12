// pages/api/translate.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    
    const { sourceText, sourceLanguage, targetLanguage } = req.body;
    if (!sourceText || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ error: "必要なパラメーターがありません" });
    }
  
    const modelEndpoint = `https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-${sourceLanguage}-${targetLanguage}`;
    
    try {
      const response = await fetch(modelEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HUGGING_FACE_TOKEN}`
        },
        body: JSON.stringify({ inputs: sourceText })
      });
      
      // APIからの応答が正常かチェック
      if (!response.ok) {
        return res.status(response.status).json({ error: "API request failed" });
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  