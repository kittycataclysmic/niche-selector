export default async function handler(req, res) {
  // 1. Only allow POST (Security)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // The "Fuel" from Vercel Settings
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }]
      }),
    });

    const data = await response.json();
    
    // Send the AI's answer back to your React app
    if (data.content && data.content[0]) {
      return res.status(200).json({ text: data.content[0].text });
    } else {
      return res.status(500).json({ error: "AI failed to respond" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
