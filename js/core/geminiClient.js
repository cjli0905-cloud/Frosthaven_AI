/**
 * js/core/geminiClient.js
 * 負責與 Gemini API 溝通的客戶端模組
 */
class GeminiClient {
  // 新增 modelName 參數，讓前端可以動態指定要呼叫哪個模型
  constructor(apiKey, modelName) {
    if (!apiKey) throw new Error("API Key is required.");
    this.apiKey = apiKey;
    this.modelName = modelName;
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;
  }

  async getAiDecision(prompt, maxRetries = 2) {
    let attempt = 0;
    while (attempt <= maxRetries) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
          })
        });
        const data = await response.json();
        if (data.error) throw new Error(`API 拒絕請求：${data.error.message}`);
        if (!data.candidates || data.candidates.length === 0) throw new Error("API 未回傳任何內容。");
        return JSON.parse(data.candidates[0].content.parts[0].text);
      } catch (error) {
        attempt++;
        if (attempt > maxRetries) throw new Error(`無法取得 AI 決策：${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}