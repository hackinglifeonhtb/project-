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
import "./Course.css"
import "./App.css"
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import Loading from './Loading'
export default function Course() {
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
    const [ready, setReady] = useState(false)
    const {course_id} = useParams();
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_DB_URI}/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    axios.post(`${process.env.REACT_APP_DB_URI}/getCourse/${course_id}`, {email:localStorage.getItem('email')})
                        .then((course)=>{
                            setCourse([course.data.courseAndTeacherData]);
                            console.log([course.data.courseAndTeacherData][0].lessons[0].Name)
                            console.log(course.data.courseAndTeacherData)
                            setReady(true)
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
                //window.location.href =`"http://localhost:3000/login?refer_to=${window.location.href}`
                console.log(err)
            })
        /*
            axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: verifiedData.email})
        */
    },[])
    return (
        <>
            { ready ? 
                    <>
                    <Header/>
                    <div>
                        <div align="center" className="course-info-bg"
                            style={{
                                width:'100%',
                                height:'85vh',
                                padding:'10px',
                                display:'flex',
                                alignItems:'center',
                                color:'#181a1b',
                                position:'absolute'
                            }}
                        >
                        </div>
                        <div align="center" className="course-info" style={{
                            width:'100%',
                            height:'85vh',
                            padding:'10px',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            color:'#9fef00',
                            position:'relative',
                            zIndex:'10000',
                            textAlign:'center'
                        }}>
                            <div>
                                <h1>هياكل البيانات والخوارزميات</h1>
                                <p style={{width:'700px'}}>ياكل البيانات والخوارزمياتياكل البيانات والخوارزمياتياكل البيانات والخوارزمياتياكل البيانات والخوارزمياتياكل البيانات والخوارزمياتياكل البيانات والخوارزمياتياكل البيانات والخوارزميات</p>
                                <div style={{display:'flex',width:'700px'}} align="center">
                                    <button type="button" class="btn btn-success">جافا سكريبت</button>
                                    <button type="button" class="btn btn-success">بايثون</button>
                                    <button type="button" class="btn btn-success">الخوارزميات</button>
                                    <button type="button" class="btn btn-success">البرمجة الكائنية</button>
                                    <button type="button" class="btn btn-success">Objects</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        padding:'20px',
                        flexWrap: 'wrap'
                    }}>
                        {
                        course[0].lessons ? course[0].lessons.map((lesson, index)=>{
                            return (
                                <>
                                    <Link to={`/courses/${course_id}/${lesson.Name}`} style={{width:'80%',textDecoration:'none'}}>
                                        <div class="card text-center lesson-card" align="center" style={{
                                            width: '100%',
                                            height: '300px',
                                            textAlign:'center',
                                            borderRadius:'10px',
                                            color:'#d1cdc7',
                                            opacity:'1',
                                            margin:'10px',
                                            borderLeft:`1px solid ${course[0].progress.Lessons[lesson.Name] ? '#9fef00' : 'rgb(200, 12, 29)'}`,
                                            display:'flex',
                                            alignItems:'center!important',
                                        }}>
                                            <div align="center">
                                                <img src={course[0].progress.Lessons[lesson.Name] ? CheckMark : impatient} height="150" width="150" />
                                                <h5>{lesson.Name}</h5>
                                                <p>{lesson.desc}</p>
                                                <a href="#" class="btn btn-primary">زيارة</a>
                                            </div>
                                            <div align="center" className="lesson-index" style={{
                                                backgroundColor:`${course[0].progress.Lessons[lesson.Name] ? '#9fef00' : 'rgb(200, 12, 29)'}`
                                            }}>
                                                <h1>{index+1}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )
                        }) : false
                        }
                    </div>
                </>
                : <Loading />
            }
        </>
    )
}