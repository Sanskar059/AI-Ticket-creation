import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../Utils/mailer.js";
import analyzeTicket from "../../";

export const onTicketCreated = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
    

      const { ticketId } = event.data;
 

      // Fetch ticket from DB
      const ticket = await step.run("fetch-ticket", async () => {
        try {
         
          const ticketObject = await Ticket.findById(ticketId);
          if (!ticketObject) {
          
            throw new NonRetriableError("Ticket not found");
          }
         
          return ticketObject;
        } catch (error) {
         
          throw error;
        }
      });

      // Keep status as TODO initially
     

      // Process with AI (outside of step.run to avoid nesting)
   
      let aiResponse;
      let relatedSkills = [];

      try {
        aiResponse = await analyzeTicket(ticket);
      

        if (aiResponse && aiResponse.helpfulNotes) {
          // Convert priority to easy/moderate/hard format
          let priority = "moderate";
          if (aiResponse.priority === "low") priority = "easy";
          else if (aiResponse.priority === "high") priority = "hard";

          relatedSkills = aiResponse.relatedSkills || [];

          console.log("📝 Updating ticket with AI analysis...");
          await Ticket.findByIdAndUpdate(ticket._id, {
           $set: { priority: priority,
            helpfulNotes: aiResponse.helpfulNotes,
            status: "IN_PROGRESS",
            relatedSkills: relatedSkills,}
          });
         
        } else {
          
          relatedSkills = ["General Support"];

          console.log("📝 Updating ticket with fallback values...");
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: "moderate",
            helpfulNotes: `Manual review required for: ${ticket.title}. Description: ${ticket.description}`,
            status: "IN_PROGRESS",
            relatedSkills: relatedSkills,
          });
          console.log("✅ Ticket updated with fallback values - Status: IN_PROGRESS");
        }
      } catch (error) {
   
        relatedSkills = ["General Support"];

        // Update with fallback values even if AI fails
        await Ticket.findByIdAndUpdate(ticket._id, {
          priority: "moderate",
          helpfulNotes: `AI processing failed. Manual review required for: ${ticket.title}. Description: ${ticket.description}`,
          status: "IN_PROGRESS",
          relatedSkills: relatedSkills,
        });
        console.log("✅ Ticket updated with error fallback values");
      }

      // Assign moderator
      const moderator = await step.run("assign-moderator", async () => {
         const ticketDoc = await Ticket.findById(ticketId);
        try {
          console.log("👤 Looking for moderator...");
          let user = await User.findOne({
            role: "moderator",
            skills: {
              $elemMatch: {
                $regex: relatedSkills.join("|"),
                $options: "i",
              },
            },
          });
          if (!user) {
            user = await User.findOne({
              role: "admin",
            });
          }
             ticketDoc.assignedTo = user?._id || null;
              await ticketDoc.save();  
          console.log("✅ Moderator assigned:", user?.email || "None");
          return user;
        } catch (error) {
          console.error("❌ Error in moderator assignment:", error.message);
          return null;
        }
      });

      // Send email notification
      await step.run("send-email-notification", async () => {
        try {
          if (moderator) {
            const finalTicket = await Ticket.findById(ticket._id);
            await sendMail(
              moderator.email,
              "Ticket Assigned",
              `A new ticket is assigned to you: ${finalTicket.title}`
            );
            console.log("✅ Email sent to moderator");
          } else {
            console.log("⚠️  No moderator found, skipping email");
          }
        } catch (error) {
          console.error("❌ Error sending email:", error.message);
        }
      });

      console.log("🎉 Ticket processing completed successfully");
      return { success: true };
    } catch (err) {
      console.error("❌ Error running the step:", err.message);
      console.error("❌ Full error:", err);
      console.error("❌ Error stack:", err.stack);
      return { success: false };
    }
  }
);