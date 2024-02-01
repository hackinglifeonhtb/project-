const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
   ticket_opener_id: {
     type: String,
     required: true
   },
   ticket_opener_full_name: {
    type: String, 
    required: true
   },
   ticket_title: {
    type: String,
    required: true
   },
   ticket_question: {
    type: String,
    required: true
   },
   tags: {
    type: Array,
    required: true
   },
   status: {
    type: String,
    default: 'O'
   },
   comments: {
    type: Array,
   },
   comments_length: {
    type:Number,
    default: 0
   },
   correct_answer: {
    type: Object
   },
   date: {
    type: String,
   }
})
const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;