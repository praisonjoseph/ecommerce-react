import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from '../components/CenteredContainer'
import { signUpAsync } from '../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';
// import { useAuth } from '../contexts/AuthContext';

function Signup() {
    const navigate = useNavigate();
    // const {signUp} = useAuth()
    const dispatch = useDispatch()
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const passwordConfirmRef = useRef('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Passwords do not match")
            return 
        }
        try {
            setLoading(true)
            dispatch(signUpAsync({email: emailRef.current.value, password: passwordRef.current.value}))
            setError('')
            navigate("/")
        } catch (error) {
            setError(`Failed to create an account with error code:${error.code}, message:${error.message}`)
        }
        setLoading(false)
    }
    return (
        <CenteredContainer>
            <Card className="mt-5">
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='w-100 mt-2'> Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                {/* Already have an account? <Link to={Login} >Log In</Link> */}
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </CenteredContainer>
    )
}

export default Signup