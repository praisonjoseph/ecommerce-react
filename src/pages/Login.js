import React, { useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from '../components/CenteredContainer'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, signInAsync } from '../redux/reducers/authReducer';
import { cartSelector } from '../redux/reducers/cartReducer';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)
    const {cartProducts} = useSelector(cartSelector)
    // const {user, loading} = useSelector(authSelector)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            dispatch(signInAsync({email: emailRef.current.value, password: passwordRef.current.value}))
            toast.success("Login successful.");
            if (cartProducts.length > 0) {
                navigate("/cart")
                return
            }
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