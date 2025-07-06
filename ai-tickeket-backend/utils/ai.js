import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  try {


    const supportAgent = createAgent({
      model: gemini({
        model: "gemini-1.5-flash-8b",
        apiKey: process.env.GEMINI_API_KEY,
      }),
      name: "AI Ticket Triage Assistant",
      system: `You are an expert AI assistant that processes technical support tickets. 

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
    });



    const response = await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "easy", "moderate", or "hard" based on complexity.
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "Short summary of the ticket",
"priority": "moderate",
"helpfulNotes": "Here are useful tips and resources...",
"relatedSkills": ["React", "Node.js"]
}

---

Ticket information:

- Title: ${ticket.title}
- Description: ${ticket.description}`);

 

    const raw = response.output[0].content;


    try {
      const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
      const jsonString = match ? match[1] : raw.trim();
     

      const parsed = JSON.parse(jsonString);
      console.log("🤖 Successfully parsed JSON:", parsed);

      // Ensure helpfulNotes is always present
      if (!parsed.helpfulNotes) {
        parsed.helpfulNotes = `Analysis for: ${ticket.title}. Description: ${ticket.description}. This ticket requires manual review.`;
      }

      return parsed;
    } catch (parseError) {
      console.error("❌ Failed to parse JSON from AI response:", parseError.message);
      console.error("❌ Raw response that failed to parse:", raw);

      // Return a default response instead of null
      return {
        summary: `Analysis of ticket: ${ticket.title}`,
        priority: "moderate",
        helpfulNotes: `This ticket requires manual review. Title: ${ticket.title}, Description: ${ticket.description}. Please assess the complexity and provide appropriate support.`,
        relatedSkills: ["General Support"]
      };
    }
  } catch (error) {
    console.error("❌ Error in AI analysis:", error.message);
    console.error("❌ Full error:", error);

    // Return a default response instead of null
    return {
      summary: `Analysis of ticket: ${ticket.title}`,
      priority: "moderate",
      helpfulNotes: `AI analysis failed. Please review manually. Title: ${ticket.title}, Description: ${ticket.description}. This ticket requires human assessment.`,
      relatedSkills: ["General Support"]
    };
  }
};

export default analyzeTicket;