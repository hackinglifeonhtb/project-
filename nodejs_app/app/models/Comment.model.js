const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
   course_id: {
     type: String,
     required: true
   },
   user_id: {
    type: String,
    required: true
   },
   lesson_naem: {
    type: String,
     required: true
   },
   comment: {
      type: String,
     required: true
   },
   date: {
    type: String,
     required: true
   }
})
const Comment = model("Comment", commentSchema);

module.exports = Comment;