import React, { useRef, useState} from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'
import { useAuth } from '../contexts/AuthContext'
import { toast } from "react-toastify";

function Login() {
    const {signIn} = useAuth()
    const navigate = useNavigate();
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await signIn(emailRef.current.value, passwordRef.current.value)
            toast.success("Login successful.");
            navigate("/")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message);
        }
        setLoading(false)
    }

    return (
        <CenteredContainer>
            <Card className="mt-5" >
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='w-100 mt-2'> Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link >Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                {/* Already have an account? <Link to={Login} >Log In</Link> */}
                Need an account? <Link to="/signup" >Sign up</Link>
            </div>
        </CenteredContainer>
    )
}

export default Login