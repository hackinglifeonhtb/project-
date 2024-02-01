import axios from 'axios'
import {React, useState, useEffect} from 'react';
import tafkeer from './Images/tafkeer.png'
import {Link} from 'react-router-dom'
import LogOut from './Images/logout.png'
import Verify from './Verify'
import bot from './robot.png'
export default function Header( props ) {
    const [name, setName] = useState('')
    const [verified, setVerified] = useState(false);
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_DB_URI}/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerified(true);
                    setName(res.data.firstName+' '+res.data.secondName)
            }).catch((err)=>{
                console.log(window.location.href)
                window.location.replace(`${process.env.REACT_APP_URI}/login?refer_to=${window.location.href}`)
                console.log(window.location.href)
            })
    }, [])
    return (
        <>
            <header className="App-header" style={{
                display:'flex',
                alignItems:'center'
            }}>
                <div className="container">
                    <div style={{display:'flex'}}>
                        <img src={bot} />
                        <h1>Pro Managing Bot</h1>
                    </div>
                    <ul>
                        <li>الصفحة الرئيسية</li>
                        <Link to='/tickets'><li>التذاكر</li></Link>
                        <li>عنا</li>
                       <Link to='/login'> <li><button>{verified ? name : 'تسجيل الدخول'}</button></li> </Link>
                    </ul>
                </div>
                {verified ? <img src={LogOut} height="75px" width="100px" style={{
                    marginLeft:'25px',
                    cursor:'pointer'
                }} onClick={()=>{localStorage.setItem('token','');window.location.reload()}} /> : undefined}

            </header>
        </>
    )
}