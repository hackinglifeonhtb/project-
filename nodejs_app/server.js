const express = require("express");
const cors = require("cors");
const User = require('./app/models/User.model')
const Course = require('./app/models/Course.model')
const Comment = require('./app/models/Comment.model')
const Ticket = require('./app/models/Ticket.model')
const TicketComments = require('./app/models/TicketComments.model')
const Notification = require('./app/models/Notification.model')
const { create_post_as_ticket, send_comment } = require('./Bot')
const app = express();
const db = require('./app/config/db.config')
const mongoose = require('mongoose')
/*var corsOptions = {
  origin: process.env.URI
};*/
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors(/*corsOption*/));
//server.js// parse requests of content-type - application/json
app.use(express.json());
/*db.sequelize.sync().then(() => {
  console.log('Users table created successfully!');
  User.create({
    firstName: "Clean Code",
    secondName: "Robert Cecil Martin",
    email: "logic2tubes@gmail.com",
    password: "",
    release_date: "2021-12-14",
  }).then(res => {
    console.log(res)
  }).catch((error) => {
    console.error('Failed to create a new record : ', error);
  });
}).catch((error) => {
  console.error('Unable to create table : ', error);
});*/

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tafkeer platform!", URI: process.env.URI });
});
app.post("/users/register", (req,res)=>{
  console.log(req.body)
  const newPassword = bcrypt.hash(req.body.password, 10, (err, hash)=>{
    User.create({
      'firstName': req.body.firstName,
      'secondName': req.body.secondName,
      'email': req.body.email,
      'password': hash,
      'token':'##',
      'curr_status': 'student',
    }).then((data)=>{
        console.log(data)
        res.status(200).json({message:'تم تسجيلك بنجاح!'})
    }).catch((err)=>{
        console.error('Failed to create a new record : ', error);
        res.status(405).json({message: 'يرجى التأكد من البيانات'})
    });
  });
})
app.post("/users/login", (req,res)=>{
  const user = User.findOne({
		email: req.body.email,
	}).then(async (user)=>{
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    console.log(isPasswordValid)
  
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.firstName,
          email: user.email,
        },
        '30SecretTafkeerSecret101', 
        {
          expiresIn: '6h'
        }
      )
      return res.status(200).json({ firstName: user.firstName, secondName: user.secondName, email: user.email, token: token, curr_status: user.curr_status })
      await User.updateOne({email: req.body.email}, {token: token})
    } else {
      return res.status(405).json({ status: 'error', user: false })
    }
  }).catch((err)=>{
    res.status(404).json({ status: 'error', error: 'Invalid login' })
  })
})
app.post('/api/verify', async (req, res) => {
  console.log(req.headers)
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, '30SecretTafkeerSecret101')
		const email = decoded.email
		User.findOne({email: email}).then((user)=>{
      res.status(200).json({ firstName: user.firstName, secondName: user.secondName, token: user.token, curr_status: user.curr_status, user_id: user._id.toString() })
    }).catch((error)=>{
      console.log(error)
      res.status(404).json({ status: 'error', error: 'invalid token' })
    })
	} catch (error) {
    console.log(error)
		res.status(404).json({ status: 'error', error: 'invalid token' })
	}
})
// getCourses and add field in every course if the user enrolled in!
app.post("/getCourses", (req,res)=>{
  User.find({email:req.body.email}).lean()
    .then(async (result)=>{
      console.log('wawwww', result)
      /*let IDs = await [];
      for(let i=0; i<result.length; i++) {
        await coursesData.push(result[i]._id);
      }*/
      Course.find({
        /*_id:{
          $in: IDs
        }*/
      })
        .then(async (data)=>{
          console.log(data[0]._id)
          console.log(data)
          let courses = await data;
          let resultArray = {};
          /*await result.forEach(async (resultItem)=>{*/
            await result[0].courses_enrolled_in.forEach(async (item)=>{
              resultArray[item.id] = await item;
            })
          /*})*/
          for(let i=0; i < data.length; i++) {
            courses[i] = courses[i].toObject();
            console.log(resultArray, data[i]._id.toString())
            console.log(resultArray[data[i]._id]!==undefined)
            if(resultArray[data[i]._id]!==undefined)
              courses[i].course_data = await resultArray[data[i]._id];
              console.log(courses[i].course_data, resultArray[data[i]._id])
            /*if(data[i]._id === result[0].courses_enrolled_in[i]._id) {
              courses[i].course_data = await result[0].courses_enrolled_in[i];
            }*/
          }
          console.log('\n\n\n\n', courses[0], courses[0].course_data, resultArray[data[0]._id], '\n\n\n\n')
          console.log('resultArray', resultArray)
          console.log(courses)
          res.status(200).json(courses)
        }).catch((err)=>{
          console.log(err)
          res.status(404).json({message:'No course found!'})
        })
    }).catch((err)=>{
      console.log(err);
    })
})

app.post("/getCourse/:course_id",(req,res)=>{
  Course.findOne({_id:new mongoose.Types.ObjectId(req.params.course_id)})
    .then(async (course)=>{
      let courseAndTeacherData = await course.toObject();
      User.findOne({email:course.OwnerEmail})
        .then(async (Teacher)=>{
          courseAndTeacherData.Teacher = await {Teacher_id: Teacher._id, full_name: Teacher.firstName + ' ' + Teacher.secondName, email: Teacher.email};
          await User.findOne({email: req.body.email})
            .then(async (user)=>{
              let found = await false
              await user.courses_enrolled_in.forEach(async (courseEnrolledIn)=>{
                console.log(courseEnrolledIn.id, req.params.course_id)
                if(courseEnrolledIn.id && courseEnrolledIn.id.toString() === req.params.course_id) {
                  courseAndTeacherData.progress = courseEnrolledIn;
                  console.log(courseAndTeacherData,"Yeah")
                  found = await true
                }
              })
              console.log(found)
              if(!found) {
                console.log("Kkkkk")
                let obj = {}
                await course.lessons.forEach((lesson)=>{
                  obj[lesson.Name] = false;
                })
                courseEnrolledIn = await JSON.stringify(user.courses_enrolled_in)
//                console.log(courseEnrolledIn)
                let x = {}
                x.id = courseAndTeacherData._id
                x.inProgress = "0"
                x.Lessons = obj
                let y = []
                console.log(courseEnrolledIn)
                console.log(2)
                await User.updateOne({email:req.body.email}, {$push : {courses_enrolled_in: x}})
                    .then((updateRes)=>{
                      console.log("Enrolled In!")
                      courseAndTeacherData.progress = user.courses_enrolled_in[user.courses_enrolled_in.length-1]
                      courseAndTeacherData.NewJoin = true
                    }).catch((err)=>{
                      console.log(err)
                    })
              }
            }).catch((err)=>res.status(404))
            res.status(200).json({message: 'Course data are ready!', courseAndTeacherData, EnrolledIn: courseAndTeacherData.progress !== undefined});
        })
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message:'No course found!'})
    })
})
app.post("/lessonCompleted/:course_id/:lesson", (req,res)=>{
  User.findOne({email: req.body.email})
    .then(async (data)=>{
      //let res2 = res.toObject();
      console.log(data)
      let found = false;
      data.courses_enrolled_in.forEach(async (course, index)=>{
        if(course.id && course.id.toString() === req.params.course_id) { 
          data.courses_enrolled_in[index].Lessons[req.params.lesson] = await true;
          found = await true;
          data.courses_enrolled_in[index].inProgress=(Object.keys(data.courses_enrolled_in[index].Lessons).filter((lesson)=>data.courses_enrolled_in[index].Lessons[lesson]).length*100/(Object.keys(data.courses_enrolled_in[index].Lessons).length)).toString()
          data.courses_enrolled_in[index].completed = (data.courses_enrolled_in[index].inProgress === "100")
          User.updateOne({email: req.body.email}, {courses_enrolled_in: data.courses_enrolled_in})
            .then((updateRes)=>{
              res.status(200).json({message:'Updated Successfully!', EnrolledIn: true})
            }).catch((err)=>{
              console.log(err)
            })
        }
      })
      //if(!found) res.status(404).json({EnrolledIn: false})
    })
})
app.post("/getUserID", (req,res)=>{
  User.findOne({email:req.body.email})
    .then((user)=>{
      res.status(200).json({message: 'User ID got successfully!', id: user._id.toString()})
    }).catch((err)=>{
      res.status(404).json({message: "User not found!"})
    })
})
app.post("/social/comments/:course_id/:lesson_name", (req,res)=>{
  Course.findOne({_id:new mongoose.Types.ObjectId(req.params.course_id)})
    .then((data)=>{
      data.lessons.forEach(async (lesson, index)=>{
        if(lesson.Name === req.params.lesson_name) { 
          res.status(200).json({message: "Comments got!", comments: lesson.Comments})
        }
      })
    }).catch((err)=>{
      res.status(404).json({message: 'Course not found!'})
      console.log(err)
    })
})
app.post("/social/new_comment/:course_id/:lesson_name/:user_id", (req,res)=>{
  Course.findOne({_id:new mongoose.Types.ObjectId(req.params.course_id)})
    .then((data)=>{
      data.lessons.forEach(async (lesson, index)=>{
        if(lesson.Name === req.params.lesson_name) { 
          await Course.updateOne({_id:new mongoose.Types.ObjectId(req.params.course_id), lessons: { $elemMatch: { Name: req.params.lesson_name } } },{ $push : { lessons: { Comments: {id: req.params.user_id, Name: req.body.name, Comment:  req.body.comment } } } })
            .then((comment)=>{
              res.status(200).json({message: "Comment Added Successfully!", comment_details: { Name: req.body.name, Comment:  req.body.comment }})
            }).catch((err)=>{
              console.log(err)
              res.status(405).json({message: 'An error occured!'})
            })
        }
      })
    }).catch((err)=>{
      res.status(404).json({message: 'Course not found!'})
      console.log(err)
    })
})
app.post("/social/tickets", (req,res)=>{
  Ticket.find({})
    .then((tickets)=>{
      res.status(200).json({message: 'Tickets got successfully!', tickets: tickets, commenters: tickets.comments_length})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: "We didn't found any tickets!"})
    })
})
app.post("/social/new_ticket", async (req,res)=>{
  const user = await User.findOne({email: req.body.email})
  Ticket.create({
    ticket_opener_id: user._id.toString(),
    ticket_opener_full_name: `${user.firstName} ${user.secondName}`,
    ticket_title: req.body.title,
    ticket_question: req.body.question,
    tags: req.body.tags,
    status: 'O'
  })
    .then(async (ticket)=>{
      await create_post_as_ticket("1171464326570328166", ticket._id.toString(), req.body.question, req.body.title)
      res.status(200).json({message: 'Ticket Created Successfully!', ticket_id: ticket._id.toString()})
    }).catch((err)=>{
      console.log(err)
      res.status(405).json({message: 'unSuccessful request!'})
    })
  /* We can create Ticket Comments document here if needed */
})
app.post("/social/ticket/correct_answer/:ticket_id/:comment_id/:user_id", async (req,res)=>{
  const user = await User.findOne({_id: new mongoose.Types.ObjectId(req.params.user_id)})
  TicketComments.updateOne({_id: new mongoose.Types.ObjectId(req.params.comment_id), ticket_id:req.params.ticket_id, correct_answer: false}, {correct_answer: true})
        .then((data)=>{
          console.log(data)
          res.status(200).json({message: 'Corrected!'})
        })
})
app.post("/social/ticket_details/:ticket_id", (req,res)=>{
  Ticket.findOne({_id:new mongoose.Types.ObjectId(req.params.ticket_id)})
    .then((ticket)=>{
      TicketComments.find({ticket_id: req.params.ticket_id})
          .then((comments)=>{
            res.status(200).json({message: 'Ticket got Successfully!', ticket: ticket, comments: comments})
          }).catch((err)=>{
            console.log(err)
            res.status(404).json({message: 'No comments!', ticket: ticket})
          })
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/ticket_title_edit/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {ticket_title: req.body.title})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket title updated Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/ticket_question_edit/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {ticket_question: req.body.question})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket question updated Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/close_ticket/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {status: 'C'})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket closed Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/open_ticket/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {status: 'O'})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket closed Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/ticket/add_comment/:ticket_id", async (req,res)=>{
  const user = await User.findOne({email: req.body.email})
  TicketComments.create({
    ticket_id: req.params.ticket_id,
    commenter_id: user._id.toString(),
    commenter_full_name: `${user.firstName} ${user.secondName}`,
    comment: req.body.comment
  })
    .then((comment)=>{
      Ticket.updateOne({_id: new mongoose.Types.ObjectId(req.params.ticket_id)}, { $inc: { comments_length: 1 } }).then(async (ticket)=>{
        console.log(ticket)
        await send_comment(req.body.comment, "1171464326570328166", req.params.ticket_id, req.body.title)
        res.status(200).json({message: 'Comment Added Successfully!', comment_id: comment._id.toString(), commenter_full_name: comment.commenter_full_name})
      }).catch((err)=>{
        console.log(err)
        res.status(405).json({message: 'Failed to update!'})
      })
    }).catch((err)=>{
      console.log(err)
      res.status(405).json({message: 'There is problem in creating it!'})
    })
})
/*app.post("/getCoursesEnrolledIn", (req,res)=>{
  Course.find({})
    .then((data)=>{
      console.log(data)
      res.status(200).json(data)
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message:'No course found!'})
    })
})*/
app.post("/UserInfo", (req,res)=>{
    db.sequelize.sync().then(()=>{
      User.findOne({
        where: {
          id: "1"
        }
      }).then((data)=>{
        console.log('Sent Successfully')
        //console.log(data.dataValues.firstName)
        console.log(JSON.stringify(data))

        res.status(200).json(data.dataValues)
      }).catch((err)=>{
        console.log('Error in sending the response of findOne function', err)
        res.status(404).json({})
      })
    }).catch(()=>{
      console.log('Error in sync!')
    })
})

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
