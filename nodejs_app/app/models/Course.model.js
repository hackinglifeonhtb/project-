const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
   Name: {
    type:String,
    required:true
   },
   desc: {
    type: String,
    required:true
   },
   OwnerEmail: {
    type: String,
     required: true
   },
   curr_status: {
    type: Boolean,
    default: false
   },
   lessons: {
    type: Array,
    required: true
   },
   exams: {
    type: Array,
    default:[]
   }
})
const Course = model("Course", courseSchema);

module.exports = Course;