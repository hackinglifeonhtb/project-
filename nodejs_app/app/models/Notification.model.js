const { Schema, model } = require("mongoose");

const notificationSchema = new Schema({
   ticket_id: {
     type: String,
     required: true
   },
   comment_id: {
    type: String, 
    required: true
   },
   comment_details: {
    type: Object, 
    required: true
   },
   message: {
    type: Object
   }
})
const Notification = model("Notification", notificationSchema);

module.exports = Notification;