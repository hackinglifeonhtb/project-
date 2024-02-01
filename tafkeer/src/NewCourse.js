import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import Header from './Header'
import Verify from './Verify'
import man1 from './Images/man1.jpg'
import man2 from './Images/man2.jpg'
import man3 from './Images/man3.jpg'
import man4 from './Images/man4.jpg'
import profile from './Images/profile.png'
import photo from './Images/photo.jpg'
import "./Lessons.css"
import "./App.css"
import YoutubeEmbed from './YoutubeEmbed'
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" ;
import SendingPaperImg from './Images/telegram.png'
import GreenSendingPaperImg from './Images/telegram2.png'
import Loading from './Loading'
export default function NewCourse() {
    const {search, subjects, inProgress, completed} = useParams();
    const [name, setName] = useState('');
    const [verifiedData, setVerifiedData] = useState([]);
    const [coursesEnrolledIn, setCoursesEnrolledIn] = useState([{}]);
    const [course, setCourse] = useState([{}]);
    const [searchSentence, setSearchSentence] = useState('')
    const [unsubscribed, setUnsubscribed] = useState(true)
    const [subscribed, setSubscribed] = useState(false)
    const [finished, setFinished] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [tags, setTags] = useState([])
    const [userID, setUserID] = useState('')
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [ready, setReady] = useState(false)
    const {course_id, lesson_name} = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setUserID(res.data.user_id)
                    axios.post(`http://localhost:8082/getCourse/${course_id}`, {email:localStorage.getItem('email')})
                        .then((course)=>{
                            setCourse([course.data.courseAndTeacherData]);
                            console.log([course.data.courseAndTeacherData][0].lessons[0].Name)
                            console.log(course.data.courseAndTeacherData)
                            setComments(course.data.courseAndTeacherData.lessons.filter((lesson)=>lesson.Name === lesson_name)[0].Comments)
                            setReady(true)
                            toast.warning('من الممكن أن لن يتم تسجيل اكمالك للدرس الا بعد اعادة تحميل الصفحة', {
                                position: "top-right",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: 100,
                            })
                            if(!course.data.courseAndTeacherData.progress.Lessons[lesson_name]) {
                                setTimeout(()=>{
                                    axios.post(`http://localhost:8082/lessonCompleted/${course_id}/${lesson_name}`, {email:localStorage.getItem('email')})
                                        .then((res)=>{
                                            course.data.courseAndTeacherData.progress.Lessons[lesson_name] = true;
                                            setCourse([course.data.courseAndTeacherData])
                                            toast.success('Lesson Completed!', {
                                                position: "top-right",
                                                autoClose: 1000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            })
                                        }).catch((err)=>{
                                            console.log(err)
                                            toast.error('Error Occured!', {
                                                position: "top-right",
                                                autoClose: 1000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            })
                                        })
                                }, 60000)
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    // axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: res.data.email})
                    //     .then((coursesEnrolledIn)=>{
                    //         setCoursesEnrolledIn(coursesEnrolledIn.coursesEnrolledIn)
                    //     }).catch((err)=>{
                    //         console.log(err);
                    //     })
            }).catch((err)=>{
                console.log(err)
            })
        /*
            axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: verifiedData.email})
        */
    },[])
    const new_comment = () => {
        axios.post(`http://localhost:8082/social/new_comment/${course_id}/${lesson_name}/${userID}`, {email: localStorage.getItem('email'), name: name, comment: comment})
            .then((res)=>{
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setComments((comments) => [...comments, res.data.comment_details])
            }).catch((err)=>{
                console.log(err)
                toast.error(err.data ? err.data.message : "An Error Occurd!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }
    return (
        <>
            <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
            />
            { ready ? 
                <>
                    <Header/>
                    <div style={{
                        display:'flex',
                        color:'white',
                        padding:'20px',
                        justifyContent:'center'
                    }}>
                        <div
                            style={{
                                width:'65%',
                                color:'white',
                            }}
                        >
                            <YoutubeEmbed embedId={Object.keys(course[0]).length>0?course[0].lessons.filter((lesson)=>lesson.Name === lesson_name)[0].youtube_id:''} />
                            <h1>{lesson_name}</h1>
                            <h3>{Object.keys(course[0]).length>0?course[0].lessons.filter((lesson)=>lesson.Name === lesson_name)[0].desc:''}</h3>
                            <div>
                                <div style={{
                                    border:'1px solid grey',
                                    width:'90%',
                                    backgroundColor:'rgb(24, 26, 27)',
                                    borderRadius:'10px',
                                    height:'450px',
                                    direction:"rtl"
                                }}>
                                    <div align="center">
                                        <h4 dir="rtl">التعليقات:</h4>
                                    </div>
                                    <div
                                        className="Scrollbar"
                                        style={{
                                            height:"400px",
                                            overflowY:'auto'
                                        }}
                                    >
                                        {
                                            comments.length>0?
                                                comments.map((comment)=>{
                                                    return (
                                                        <>
                                                            <h3>{comment.Name}</h3>
                                                            <h6>{comment.comment}</h6>
                                                        </>
                                                    )
                                                })
                                            :""
                                        }
                                    </div>
                                    <div align="center">
                                        <div align="center" className="send_comment_design" style={{
                                            backgroundColor: "black",
                                            border: "1px solid black",
                                            borderRadius: "10px",
                                            width: "80%",
                                            display:'flex',
                                            justifyContent:'center',
                                            padding:'10px'
                                        }}>
                                            <img src={SendingPaperImg} height="50px" width="50px" onClick={()=>new_comment()} style={{cursor:'pointer'}} />
                                            <input type="text" placeholder="اكتب تعليقك هنا" style={{color:'#9fef00', width:'90%'}} onChange={(e)=>setComment(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Scrollbar" style={{
                            height:'100vh',
                            backgroundColor:'#181a1b',
                            width:'35%',
                            borderRadius:'10px',
                            overflowY:'auto',
                        }}>
                            {
                                Object.keys(course[0]).length>0?
                                    course[0].lessons.map((lesson, index)=>{
                                        return (
                                            <Link to={`http://localhost:3000/courses/${course_id}/${lesson.Name}`} style={{textDecoration:'none'}}>
                                                <div style={{
                                                    justifyContent:'space-between',
                                                    padding:'20px',
                                                    backgroundColor:`${lesson_name === lesson.Name ? "rgb(57, 63, 66)" : '#121313'}`,
                                                    display:'flex',
                                                    alignItems:'center',
                                                    borderRadius:`${index==0?"10px 10px":"0px 0px"} ${index==(Object.keys(course[0]).length>0?
                                                        course[0].lessons.length-1:'') ? "10px 10px" : "0px 0px"}`,
                                                    borderBottom:`${index==(Object.keys(course[0]).length>0?
                                                        course[0].lessons.length-1:'')?"":"0.5px solid grey"}`,
                                                }}>
                                                    <div align="center">
                                                        <img height="75" width="75" src={course[0].progress.Lessons[lesson.Name] ? CheckMark : impatient} />
                                                    </div>
                                                    <div align="center">
                                                        <h3>{lesson.Name}</h3>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                :''
                            }
                        </div>
                    </div>
                </>
                : <Loading />
            }
        </>
    )
}