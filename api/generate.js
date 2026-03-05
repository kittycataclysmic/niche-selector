export default async function handler(req, res) {
  // 1. Security check: Only allow the quiz to "POST" data here
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, 
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }]
      }),
    });

    const data = await response.json();
    
    // 2. Send the AI's response back to your React App
    if (data.content && data.content[0]) {
      return res.status(200).json({ text: data.content[0].text });
    } else {
      console.error("Anthropic Error:", data);
      return res.status(500).json({ error: "AI failed to respond" });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
