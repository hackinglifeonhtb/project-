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
import "./Tickets.css"
import "./App.css"
import YoutubeEmbed from './YoutubeEmbed'
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" ;
import SendingPaperImg from './Images/telegram.png'
import GreenSendingPaperImg from './Images/telegram2.png'
import commentImg from './Images/comments.png'
import PaperPlane from './Images/paper-plane.png'
import Seal from './Images/seal.png'
import Loading from './Loading'
export default function Tickets() {
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
    const [opened, setOpened] = useState(false)
    const [pending, setPending] = useState(false)
    const [closed, setClosed] = useState(false)
    const [tickets, setTickets] = useState([])
    const [ready, setReady] = useState(false)
    const {course_id, lesson_name} = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setUserID(res.data.user_id)
                    axios.post('http://localhost:8082/social/tickets')
                        .then((tickets_data)=>{
                            console.log(tickets_data.data.tickets)
                            setTickets(tickets_data.data.tickets)
                            setReady(true)
                        })
            }).catch((err)=>{
                console.log(err)
            })
        /*
            axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: verifiedData.email})
        */
    },[])
    // const new_comment = () => {
    //     axios.post(`http://localhost:8082/social/new_comment/${course_id}/${lesson_name}/${userID}`, {email: localStorage.getItem('email'), name: name, comment: comment})
    //         .then((res)=>{
    //             toast.success(res.data.message, {
    //                 position: "top-right",
    //                 autoClose: 1000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             })
    //             setComments((comments) => [...comments, res.data.comment_details])
    //         }).catch((err)=>{
    //             console.log(err)
    //             toast.error(err.data ? err.data.message : "An Error Occurd!", {
    //                 position: "top-right",
    //                 autoClose: 1000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             })
    //         })
    // }
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
                    <div align="center" className="tickets-main">
                        <div className="tickets-container">
                            <div className="check-box-filter">
                                <div dir="rtl">
                                    <br/>
                                    <h3 draggable>الحالة</h3>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setOpened(curr=>!curr)} />
                                        <label>قائمة</label>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setPending(curr=>!curr)} />
                                        <label>قيد المراجعة</label>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input type='checkbox' onChange={()=>setClosed(curr=>!curr)} />
                                        <label>مغلقة</label>
                                    </div>
                                </div>
                            </div>
                            <div className="search-field filter" dir="rtl">
                                <input type="text" placeholder="عن ماذا تبحث؟" className="tickets-search-input"  />
                                <button className="search-button">بحث</button>
                            </div>
                            <div className="tickets">
                                <div className='new-ticket'>
                                    <Link to="/ticket/new_ticket" style={{textDecoration: 'none'}}>
                                        <button className="new-ticket-button"> + تذكرة جديدة</button>
                                    </Link>
                                </div>
                                {
                                    tickets.map((ticket)=>{
                                        return (
                                            <Link to={`/tickets/${ticket._id.toString()}`} style={{textDecoration:'none'}}>
                                                <div className="ticket">
                                                    <div className="ticket-status">
                                                        <div className="ticket-status-circle"></div>
                                                        <div><p>{ticket.status == 'O' ? "قائمة" : ticket.status == 'P' ? "قيد المراجعة" : "مغلقة"}</p></div>
                                                    </div>
                                                    <h2>{ticket.ticket_title}</h2>
                                                    <p>{ticket.ticket_question}</p>
                                                    <div className="ticket-statistics" dir="rtl">
                                                        <img src={PaperPlane} width="25" height="25" />
                                                        <p>{ticket.comments_length}</p>
                                                    </div>
                                                {/* <div className="ticket-solved" align="center">
                                                        <img src={Seal} width="150px" height="150px" />
                                                    </div>
                                                    */}
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </>
                : <Loading />
            }
        </>
    )
}