import React, { useState } from 'react'
import {Button, Divider, Form, Input, Typography} from 'antd'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import './Signin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await axios.post('http://127.0.0.1:8000/signin', {
            "name": "name",
            "email": email,
            "password": password,
            "userInterest": {
                "additionalProp1": [
                "string"
                ],
                "additionalProp2": [
                "string"
                ],
                "additionalProp3": [
                "string"
                ]
            },
            "user_likes": {
                "additionalProp1": [
                "string"
                ],
                "additionalProp2": [
                "string"
                ],
                "additionalProp3": [
                "string"
                ]
            }
        })
        console.log(response)
        if(response.status === 200) {
            Swal.fire({title: "Login Successful!", 
            confirmButtonText: "Ok"})
            .then((result) => {
                const user = response.data;
                if(result.isConfirmed) {
                    navigate('/home', {state: user.userid})
                }
            });
        }
    }

  return (
    <div className='appBg'>
        <div className='formBg'>
            <Form className='loginForm'>
                <Typography className='heading'>LOGIN</Typography>
                <Typography className='label'>Email ID</Typography>
                <Form.Item name={"myEmail"}>
                    <Input className='input' type='email' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>
                <Typography className='label'>Password</Typography>
                <Form.Item name={"myPassword"} onChange={(e) => setPassword(e.target.value)}>
                    <Input type='password' className='input'/>
                </Form.Item>
                <div style={{display: 'flex'}}>
                    <Typography className='text' style={{marginRight: '85px'}}>Remember me?</Typography>
                    <Typography className='text'>Forgot password?</Typography>  
                </div>
                <Button className='button1' onClick={handleLogin}>LOGIN</Button>
                <Divider style={{borderColor: 'white', color: 'white'}}>OR</Divider>
                <Button className='button2'><FaFacebookF style={{marginTop: '3px', marginRight: '5px'}}/>  Continue with Facebook</Button>
                <Button className='button3'><FaGoogle style={{marginTop: '3px', marginRight: '5px'}}/>  Continue with Google</Button>
                <Typography className='text' style={{marginTop: '5%', textAlign: 'center'}}>By continuing, you agree to our Term's and conditions, privacy policy</Typography>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                    <Typography className='text' style={{marginRight: '15px'}}>Don't have an account?</Typography>
                    <Typography className='text' style={{position: 'relative', cursor: 'pointer'}} onClick={() => navigate('/')}>Create account <span style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', borderBottom: '1px solid', paddingBottom: '2px' }}></span></Typography>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Signin