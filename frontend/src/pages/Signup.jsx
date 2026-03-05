import React, { useState } from 'react'
import {Button, Form, Input, Typography} from 'antd'
import './Signup.css'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        navigate('/userInterest')
    }

  return (
    <div className='appBg'>
        <div className='formBg'>
            <Form className='loginForm'>
                <Typography className='heading'>SIGN UP</Typography>
                <Typography className='label'>Name</Typography>
                <Form.Item name={"Username"}>
                    <Input className='input' type='text' onChange={(e) => setName(e.target.value)}/>
                </Form.Item>
                <Typography className='label'>Email ID</Typography>
                <Form.Item name={"Email"}>
                    <Input className='input' type='email' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>
                <Typography className='label'>Password</Typography>
                <Form.Item name={"Password"}>
                    <Input className='input' type='password' onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>
                <Typography className='text' style={{marginTop: '5%', textAlign: 'center'}}>I've read and agreed to Term's and Conditions</Typography>
                <Button className='button1' onClick={handleSubmit}>REGISTER</Button>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                    <Typography className='text' style={{marginRight: '15px'}}>Already a user?</Typography>
                    <Typography className='text' style={{position: 'relative', cursor: 'pointer'}} onClick={() => navigate('/signin')}>Login <span style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', borderBottom: '1px solid', paddingBottom: '2px' }}></span></Typography>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Signup