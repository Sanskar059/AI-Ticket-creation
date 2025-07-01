import dotenv from "dotenv";
import analyzeTicket from "./utils/ai.js";

// Load environment variables
dotenv.config();

console.log("🔧 Environment Check:");
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Found" : "❌ Not found");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Not found");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Found" : "❌ Not found");
console.log("INNGEST_EVENT_KEY:", process.env.INNGEST_EVENT_KEY ? "✅ Found" : "❌ Not found");

console.log("\n" + "=".repeat(50));
console.log("🧪 TESTING AI FUNCTION");
console.log("=".repeat(50));

// Test ticket data
const testTicket = {
    title: "React Component Not Rendering",
    description: "My React component is not rendering properly. I have a button that should show a modal when clicked, but nothing happens. I'm using useState hook and the state is not updating. Please help me debug this issue."
};

console.log("\n📝 Test Ticket:");
console.log("Title:", testTicket.title);
console.log("Description:", testTicket.description);

console.log("\n🚀 Calling AI Analysis Function...");
console.log("=".repeat(50));

// Call the AI function
analyzeTicket(testTicket)
    .then((result) => {
        console.log("\n" + "=".repeat(50));
        console.log("✅ AI ANALYSIS RESULT:");
        console.log("=".repeat(50));
        console.log("Summary:", result?.summary);
        console.log("Priority:", result?.priority);
        console.log("Helpful Notes:", result?.helpfulNotes);
        console.log("Related Skills:", result?.relatedSkills);
        console.log("\nFull Result Object:", JSON.stringify(result, null, 2));
    })
    .catch((error) => {
        console.log("\n" + "=".repeat(50));
        console.log("❌ AI ANALYSIS FAILED:");
        console.log("=".repeat(50));
        console.error("Error:", error.message);
        console.error("Full Error:", error);
    }); 