import axios from 'axios'
import { useEffect, useState } from 'react';
export default function Verify(props) {
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState('');
    useEffect(()=> {
        axios.post(`http://localhost:8082/api/verify`, {token: props.token || ''}, {headers:{'x-access-token':props.token, 'email':props.email}})
        .then(async (res)=>{
            console.log(res.data)
            setVerified(true);
            setEmail(res.dataValues.email);
        }).catch((err)=>{
            /*
                verified is already false!
             */
        })
    },[])
    return {verified, email};
}