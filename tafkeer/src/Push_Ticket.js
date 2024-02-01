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
import "./Ticket.css"
import "./Push_Ticket.css"
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
export default function Push_Ticket() {
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
    const [ticket, setTicket] = useState([])
    const [commentsLength, setCommentsLength] = useState(0)
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [num, setNum] = useState(parseInt(Math.random()*100))
    const [ready, setReady] = useState(false)
    const {ticket_id} = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setUserID(res.data.user_id)
                    setReady(true)
                    // axios.post(`http://localhost:8082/social/ticket_details/${ticket_id}`)
                    //     .then((ticket_data)=>{
                    //         console.log(ticket_data.data.ticket)
                    //         setTicket(ticket_data.data.ticket)
                    //         setComments(ticket_data.data.comments)
                    //         setCommentsLength(ticket_data.data.ticket.comments_length)
                    //     })
            }).catch((err)=>{
                console.log(err)
            })
        /*
            axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: verifiedData.email})
        */
    },[])
    const newTicket = () => {
        axios.post(`http://localhost:8082/social/new_ticket`, {'email':localStorage.getItem('email'), title: title, question: question, tags: []})
            .then((res)=>{
                window.location.replace(`http://localhost:3000/tickets/${res.data.ticket_id}`)
            }).catch((err)=>{
                console.log(err)
            })
    }
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
                <div>
                    <div align="center" className="tickets-main">
                        <div className="tickets-container">
                            {/*<Link to={`/tickets/${ticket._id.toString()}`} style={{textDecoration:'none'}}>*/}
                            <div className="new-comment-button" style={{
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'absolute',
                                zIndex: '1',
                                left: '650px',
                                top: '110px'
                            }} onClick={()=>newTicket()}>
                                        نشر
                            </div>
                                <div className="ticket">
                                    <div className="ticket-status">
                                        <div className="ticket-status-circle"></div>
                                        <div><p>قائمة</p></div>
                                    </div>
                                    <h2><input type="text" placeholder="اكتب العنوان هنا" className="new-ticket-input" style={{ backgroundColor: 'transparent', border: 'none' }} onChange={(e)=>setTitle(e.target.value)}/></h2>
                                    <p><textarea type="text" placeholder="اكتب المشكلة هنا" className="new-ticket-input" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', resize: 'none' }} cols="100" rows="10" onChange={(e)=>setQuestion(e.target.value)} /></p>
                                    <div className="ticket-statistics" dir="rtl">
                                        <img src={PaperPlane} width="25" height="25" />
                                        <p>{num}</p>
                                    </div>
                                    {/* <div className="ticket-solved" align="center">
                                        <img src={Seal} width="150px" height="150px" />
                                    </div>
                                    */}
                                    
                                </div>
                            {/*</Link>*/}
                        </div>
                    </div>
                </div>
            </>
              : <Loading />
            }
        </>
    )
}