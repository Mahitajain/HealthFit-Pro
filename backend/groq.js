import Groq from "groq-sdk";
  
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function generateMealPlan(prompt) {
  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      { role: "system", content: "You are a professional nutritionist." },
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
}
