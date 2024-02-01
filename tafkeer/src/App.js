import logo from './logo.svg';
import axios from 'axios'
import tafkeer from './Images/tafkeer.png'
import cpp from './Images/cpp.svg.png'
import java from './Images/java.png'
import js from './Images/js-removebg-preview.png'
import python from './Images/python-removebg-preview.png'
import ruby from './Images/ruby.png'
import './App.css'
import man1 from './Images/man1.jpg'
import man2 from './Images/man2.jpg'
import man3 from './Images/man3.jpg'
import man4 from './Images/man4.jpg'
import profile from './Images/profile.png'
import photo from './Images/photo.jpg'
import Header from './Header'
import {React, useEffect, useState} from 'react'
export default function App() {
  const [name, setName] = useState('')
  const [keys, setKeys] = useState([])
  const [randomW, setRandomW] = useState([])
  useEffect(()=>{
    setRandomW([`${Math.random()*75}%`,`${Math.random()*75}%`,`${Math.random()*75}%`])
    console.log('yesddd')
    axios.post(`${process.env.URI}:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
      .then((res)=>{
        if(res.data.firstName !== undefined && res.data.secondName !== undefined)
          setName(res.data.firstName+' '+res.data.secondName)
      }).catch((err)=>{

      })
  },[])
  return (
    <div style={{height:'100%', width:'100%'}}>
      <Header name={name} />
      <div align="center" style={{color:'white'}}>
        <img src={tafkeer} style={{height:'200px',width:'200px'}} />
        <h2>منصة تفكير التعليمية</h2>
        <p>منصة تفكير التعليمية هي منصة تقدم دورات تخص طلاب الجامعات بأفضل دقة</p>
      </div>
      <hr/>
      <div align="center" dir="rtl">
        <h2>من دوراتنا المميزة</h2>
        <div>
          <div style={{
            display:'flex',
            justifyContent:'center',
            justifyContent:'space-around',
            direction:'ltr',
            width:'75%',
            alignItems:'center',
            flexWrap:'wrap'
          }}>
            {/*<div style={{
              /*backgroundColor:'black',
              padding:'10px',
              transform:'skewX(5deg)'*//*
            }}>
              <img src={man1} style={{
                borderRadius:'50%',
              }} />
              <h3>عبدالعزيز</h3>
              <p>دكتور في جامعة الملك سعود</p>
            </div>*/}
            {[1,2,3,4,5,6].map(()=>{
                return (
                  <div class="card mb-3" style={{
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
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
