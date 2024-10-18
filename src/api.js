// src/api.js
export const getAIResponse = async (
  message,
  selectedChat,
  conversationHistory
) => {
  if (!selectedChat) {
    throw new Error("Selected chat is undefined");
  }

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = "https://api.openai.com/v1/chat/completions";

  // Construct the system prompt
  const systemPrompt = `You are ${selectedChat.name}, a ${selectedChat.role} at the company. Your personality: ${selectedChat.personality} Background: ${selectedChat.background}. Respond to the user's messages in first person, keeping in character. Your responses should be witty and humorous, but remain professional and believable. Do not mention that you are an AI language model. Keep responses concise and natural.`;

  // Limit conversation history to the last 5 messages to stay within token limits
  const recentHistory = conversationHistory.slice(-5).map((msg) => ({
    role: msg.type === "user" ? "user" : "assistant",
    content: msg.content,
  }));

  const payload = {
    model: "gpt-3.5-turbo",
    temperature: 0.7, // Adjust as needed
    messages: [
      { role: "system", content: systemPrompt },
      ...recentHistory,
      { role: "user", content: message },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();
    return aiResponse;
  } catch (error) {
    console.error("Error in getAIResponse:", error);
    throw error;
  }
};
