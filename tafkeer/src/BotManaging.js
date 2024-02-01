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
import "./BotManaging.css"
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import Loading from './Loading'
import discord from './Images/discord9.png'
import setting from './Images/setting.png'
import DataAnalystCharts from './DataAnalystCharts'
export default function BotManaging() {
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
        axios.post(`https://nodejs3-5e53e7e9c48f.herokuapp.com/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setReady(true)
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

                    <div align="center" style={{width:'100%'}}>
                        <div style={{
                            backgroundColor:'#181a1b',
                            borderRadius: '10px',
                            width:'80%',
                            padding:'50px'
                        }}>
                            <div>
                            <DataAnalystCharts/>
                            </div>
                            <div style={{
                                display:'flex',
                                justifyContent:'space-around',
                                textAlign:'center',
                                alignItems:'center',
                                padding:'30px'
                            }}>
                                
                                <img src={discord} width="80" />
                                <h1>Pro Managing System</h1>
                            </div>
                            <hr/>
                            <img src={setting} width="100" />
                            <h1>Settings</h1>
                            <div style={{
                                display:'flex',
                                flexWrap: 'wrap',
                                width:'100%',
                                /*border:'1px solid white',*/
                                borderRadius:'10px',
                                padding:'10px'
                            }}>
                                {
                                    [{name: 'Application', On: true},{name: 'Tickets', On: false},{name: 'Tickets', On: false},{name: 'Tickets', On: false}] .map((service) => {
                                        return (
                                            <div style={{
                                                backgroundColor: '#1b1d1e',
                                                width:'48%',
                                                height:'200px',
                                                borderRadius:'10px',
                                                padding:'10px',
                                                margin: '10px',
                                                border: '1px solid grey',
                                            }}>
                                                <h1>{service.name} Service</h1>
                                                <h3>On</h3>
                                                <label class="switch">
                                                    <input type="checkbox" checked={service.On} />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
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
