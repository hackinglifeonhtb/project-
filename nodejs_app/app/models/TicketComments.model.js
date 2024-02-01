const { Schema, model } = require("mongoose");

const ticketCommentsSchema = new Schema({
   ticket_id: {
     type: String,
     required: true
   },
   commenter_id: {
    type: String, 
    required: true
   },
   commenter_full_name: {
    type: String,
    required: true
   },
   comment: {
    type: String,
    required: true
   },
   correct_answer: {
    type: Boolean,
    default: false
   },
   date: {
     type: String,
   }
})
const TicketComments = model("TicketComments", ticketCommentsSchema);

module.exports = TicketComments;