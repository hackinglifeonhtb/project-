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
import "./Courses.css"
import "./App.css"
import {Meter} from '@react-spectrum/meter'
import Loading from './Loading'
export default function Courses() {
    const {search, subjects, inProgress, completed} = useParams();
    const [name, setName] = useState('');
    const [verifiedData, setVerifiedData] = useState([]);
    const [coursesEnrolledIn, setCoursesEnrolledIn] = useState([{}]);
    const [courses, setCourses] = useState([]);
    const [searchSentence, setSearchSentence] = useState('')
    const [unsubscribed, setUnsubscribed] = useState(true)
    const [subscribed, setSubscribed] = useState(false)
    const [finished, setFinished] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [tags, setTags] = useState([])
    const [ready, setReady] = useState(false)
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_DB_URI}/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    axios.post(`${process.env.REACT_APP_DB_URI}/getCourses`, {email:localStorage.getItem('email')})
                        .then((courses)=>{
                            setCourses(courses.data);
                            console.log(courses.data)
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
                    <div style={{
                        display:'flex',
                        justifyContent:'space-between',
                        padding:'20px',
                        height:'85vh'
                    }}>
                            <div className="Scrollbar" style={{
                                display:'flex',
                                justifyContent:'center',
                                justifyContent:'space-around',
                                direction:'ltr',
                                width:'75%',
                                alignItems:'center',
                                flexWrap:'wrap',
                                overflowY:'auto'
                            }}>
                                    {courses.filter((course)=>{
                                        return (
                                            (course.Name.toLowerCase().includes(searchSentence.toLowerCase()) || searchSentence.toLowerCase().includes(course.Name.toLowerCase()))
                                        )
                                    }).map((course)=>{
                                        return (
                                            <Link to={`/courses/${course._id.toString()}`} style={{textDecoration: 'none'}}>
                                                <div class="card mb-3" align="center" style={{
                                                    width:'300px',
                                                    backgroundColor:'#181a1b!important',
                                                    color:'white',
                                                    /*boxShadow:'3em 1em transparent'*/
                                                }}>
                                                    <div className="card-img-div">
                                                    <img src={photo} class="card-img-top card-img-tafkeer" alt="..."/>
                                                    <img src={man1} style={{width:'50px', height:'50px', marginTop:'-30px', borderRadius:'50%'}} />
                                                    </div>
                                                    <div class="card-body" style={{
                                                        backgroundColor:'dark'
                                                    }}>
                                                    <h5 class="card-title">{course.Name}</h5>
                                                    <p class="card-text">{course.disc || 'No disc...'}</p>
                                                    <br/>
                                                    <div>
                                                    {course.course_data !== undefined ? 
                                                        <>
                                                            <p class="styled">
                                                                <progress value={course.course_data.inProgress} max="100"></progress>
                                                            </p>
                                                                <Meter
                                                                    label="Progress"
                                                                    marginBottom="size-300"
                                                                    value={parseInt(course.course_data.inProgress)}
                                                                    variant="warning"
                                                                />
                                                        </>
                                                        :
                                                        <button className="Visit">زيارة</button>
                                                    }
                                                    </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                                <div
                                style={{
                                    width:'25%',
                                    backgroundColor:'#181a1b',
                                    borderRadius:'10px 10px 10px 10px',
                                    padding:'20px'
                                }}
                            >
                                <div dir="rtl" align="center" style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="search-process">
                                    <input type="text" placeholder="اكتب ما تود البحث عنه" className="search-input" style={{borderRadius:'0px 5px 5px 0px'}} onChange={(e)=>setSearchSentence(e.target.value)} />
                                    <button className="search-bt">بحث</button>
                                </div>
                                <div dir="rtl">
                                    <br/>
                                    <h3 draggable>الحالة</h3>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setUnsubscribed(curr=>!curr)} />
                                        <label>غير منضم</label>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setSubscribed(curr=>!curr)} />
                                        <label>منضم اليها</label>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setFinished(curr=>!curr)} />
                                        <label>أنهيتها</label>
                                    </div>
                                    <h3 draggable>المدربين</h3>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTeachers(curr=>curr[0]['عبدالله الحربي'] = !curr[0]['عبدالله الحربي'])} />
                                        <label>عبدالله الحربي</label>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTeachers(curr=>curr[0]['عبدالله الحربي'] = !curr[0]['عبدالله الحربي'])} />
                                        <label>صهيب الجهني</label>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTeachers(curr=>curr[0]['عبدالله الحربي'] = !curr[0]['عبدالله الحربي'])} />
                                        <label>عبدالعزيز الابراهيم</label>
                                    </div>
                                    <h3 draggable>الكلمات المفتاحية</h3>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTags(curr=>curr[0]['Data Structures'] = !curr[0]['Data Structures'])} />
                                        <label>Data Structures</label>
                                    </div><div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTags(curr=>curr[0]['Web Development'] = !curr[0]['Web Development'])} />
                                        <label>Web Development</label>
                                    </div><div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTags(curr=>curr[0]['JavaScript'] = !curr[0]['JavaScript'])} />
                                        <label>JavaScript</label>
                                    </div><div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTags(curr=>curr[0]['Python'] = !curr[0]['Python'])} />
                                        <label>Python</label>
                                    </div><div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setTags(curr=>curr[0]['Data Analytics'] = !curr[0]['Data Analytics'])} />
                                        <label>Data Analytics</label>
                                    </div>
                                </div>
                            </div>
                    </div>
                </>
                : <Loading />
            }
        </>
    )
}