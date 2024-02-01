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
import correctingMark from './Images/badge.png'
export default function Ticket() {
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
    const [ready, setReady] = useState(false)
    const [correctAnswerVal, setCorrectAnswerVal] = useState([])
    const [alerter, setAlerter] = useState(false)
    const {ticket_id} = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setUserID(res.data.user_id)
                    axios.post(`http://localhost:8082/social/ticket_details/${ticket_id}`)
                        .then((ticket_data)=>{
                            console.log(ticket_data.data)
                            setTicket(ticket_data.data.ticket)
                            setComments(ticket_data.data.comments)
                            setCommentsLength(ticket_data.data.ticket.comments_length)
                            setReady(true)
                        })
            }).catch((err)=>{
                console.log(err)
            })
        /*
            axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: verifiedData.email})
        */
    },[])
    const newCommentOrSolution = () => {
        axios.post(`http://localhost:8082/social/ticket/add_comment/${ticket_id}`, {'email':localStorage.getItem('email'), comment: comment, title: ticket.ticket_title})
            .then((res)=>{
                setComments((comments)=>[...comments, {comment_id: res.data.comment_id, commenter_full_name: res.data.commenter_full_name, comment: comment}])
                setCommentsLength((commentsLength)=>commentsLength+1)
            }).catch((err)=>{
                console.log(err)
            })
    }
    const correctAnswer = () => {
        axios.post(`http://localhost:8082/social/ticket/correct_answer/${ticket_id}/${correctAnswerVal[0]}/${correctAnswerVal[1]}`, {'email':localStorage.getItem('email')})
            .then((res)=>{
                window.location.reload()
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
                    <div style={{position:'relative', height:'100vh',width:'100%'}}>
                        <div align="center" className="tickets-main" style={{position:'absolute'}}>
                            <div className="tickets-container">
                                {/*<Link to={`/tickets/${ticket._id.toString()}`} style={{textDecoration:'none'}}>*/}
                                    <div className="ticket">
                                        <div className="ticket-status">
                                            <div className="ticket-status-circle"></div>
                                            <div><p>{ticket.status == 'O' ? "قائمة" : ticket.status == 'P' ? "قيد المراجعة" : "مغلقة"}</p></div>
                                        </div>
                                        <h2>{ticket.ticket_title}</h2>
                                        <p>{ticket.ticket_question}</p>
                                        <div className="ticket-statistics" dir="rtl">
                                            <img src={PaperPlane} width="25" height="25" />
                                            <p>{commentsLength }</p>
                                        </div>
                                        {/* <div className="ticket-solved" align="center">
                                            <img src={Seal} width="150px" height="150px" />
                                        </div>
                                        */}
                                        
                                    </div>
                                {/*</Link>*/}
                                <div className="tickets" align="center">
                                    <div>
                                            <input type="text" placeholder="تعليقك أو حلك" className="comments-search-input" onChange={(e)=>setComment(e.target.value)} />
                                            <button className="new-comment-button" onClick={()=>newCommentOrSolution()} style={{
                                                borderRadius:'5px 0px 0px 5px'
                                            }}>نشر</button>
                                    </div>
                                    {
                                    comments.map((comment)=>{
                                        return (
                                            <Link to={`/tickets/${ticket._id.toString()}`} style={{textDecoration:'none'}}>
                                                <div className="ticket" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                                    <div>
                                                        <div className="ticket-status">
                                                            <div className="ticket-status-circle"></div>
                                                            <div><p>{ticket.status == 'O' ? "قائمة" : ticket.status == 'P' ? "قيد المراجعة" : "مغلقة"}</p></div>
                                                        </div>
                                                        <h2>{comment.commenter_full_name}</h2>
                                                        <p>{comment.comment}</p>
                                                        <div className="ticket-statistics" dir="rtl">
                                                        </div>
                                                        {/* <div className="ticket-solved" align="center">
                                                            <img src={Seal} width="150px" height="150px" />
                                                        </div>
                                                        */}
                                                    </div>
                                                    <div className="correcting-mark-div" style={{
                                                        opacity: `${comment.correct_answer ? '1': '0.25'}`
                                                    }} onClick={()=>{
                                                        setCorrectAnswerVal([comment._id.toString(), comment.commenter_id])
                                                        setAlerter(true)
                                                    }}>
                                                        <img className="correcting-mark" src={correctingMark} width="100" />
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        { alerter ? 
                            <div align="center">
                                <div style={{
                                    height:'100vh',
                                    width:'100%',
                                    backgroundColor: 'black',
                                    opacity:'0.4',
                                    position:'absolute',
                                }}>

                                </div>
                                <div align="center" style={{
                                    height:'100vh',
                                    width:'100%',
                                    position: 'absolute',
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <div align="center" style={{
                                        backgroundColor:'#181a1b',
                                        height:'200px',
                                        width:'600px',
                                        borderRadius:'10px',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        zIndex:'1'
                                    }}>
                                        <div>
                                            <p>هل أنت متأكد لن يمكنك تغيير تعيينك لها كإجابة صحيحة </p>
                                            <button className="new-ticket-button" onClick={()=>correctAnswer()}>تأكيد</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                            :<></>
                        }
                    </div>
                </>
                : <Loading />
            }
        </>
    )
}