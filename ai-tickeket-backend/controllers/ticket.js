import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    console.log("🎫 Creating ticket with:", { title, description, userId: req.user._id });
    console.log("🔧 Environment check - INNGEST_EVENT_KEY:", process.env.INNGEST_EVENT_KEY ? "Found" : "Not found");

    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id.toString(),
    });

    console.log("✅ Ticket created successfully:", newTicket._id);
    console.log("📝 Initial ticket data:", {
      title: newTicket.title,
      description: newTicket.description,
      status: newTicket.status,
      priority: newTicket.priority,
      helpfulNotes: newTicket.helpfulNotes,
      relatedSkills: newTicket.relatedSkills
    });

    // Try to send Inngest event, but don't fail if it doesn't work
    try {
      console.log("🚀 Sending Inngest event for ticket:", newTicket._id);
      console.log("📤 Event data:", {
        name: "ticket/created",
        data: {
          ticketId: newTicket._id.toString(),
          title,
          description,
          createdBy: req.user._id.toString(),
        }
      });

      await inngest.send({
        name: "ticket/created",
        data: {
          ticketId: newTicket._id.toString(),
          title,
          description,
          createdBy: req.user._id.toString(),
        },
      });
      console.log("✅ Inngest event sent successfully");
    } catch (inngestError) {
      console.error("❌ Inngest event failed:", inngestError.message);
      console.error("❌ Full Inngest error:", inngestError);
      console.error("❌ Inngest error stack:", inngestError.stack);
      // Don't throw the error - ticket creation should still succeed
    }

    return res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("❌ Error creating ticket:", error.message);
    console.error("❌ Full error:", error);
    return res.status(500).json({ error: "Ticket creation failed", details: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];
    if (user.role !== "user") {
      tickets = await Ticket.find({})
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 });
    }
    return res.json({ tickets });
  } catch (error) {
    console.error("Error fetching tickets", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    let ticket;

    if (user.role !== "user") {
      ticket = await Ticket.findById(req.params.id).populate("assignedTo", [
        "email",
        "_id",
      ]);
    } else {
      ticket = await Ticket.findOne({
        createdBy: user._id,
        _id: req.params.id,
      }).select("title description status createdAt");
    }

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    return res.json({ ticket });
  } catch (error) {
    console.error("Error fetching ticket", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};