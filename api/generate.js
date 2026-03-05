async function fetchBrandStatement(ans, primary, secondary) {
  // ... Keep your prompt construction exactly as it is ...

  const res = await fetch("/api/generate", { // Points to your Vercel function
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: prompt }), // Pass the prompt to the backend
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "M&M Engine Failure");
  }

  const data = await res.json();
  return data.text.trim(); // Return the clean text from the proxy
}
