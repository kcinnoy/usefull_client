import { useState, useEffect, useContext } from 'react';
import  axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Container, Grid, Form, Icon, Input } from 'semantic-ui-react';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';



export default function ForgotPasswordPage() {
    //state
    const [email,setEmail] = useState('');
    const [success,setSuccess] = useState('');
    const [resetCode,setResetCode] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [loading,setLoading] = useState(false);

    // context 
    const {state: {user}} = useContext(Context)
    // router
    const router = useRouter();

    // redirect if user logged in 
    useEffect(() => {
        if (user !== null) router.push('/');
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const {data } = await axios.post('/api/forgot-password, {email}');
            setSuccess(true);
            toast('Check your inbox (and spam folder) for reset code');
        } catch (err) {
            setLoading(false);
            toast(err.response.data)
        }
    };

    return (
        <>
        <Grid padding='true'>
            <Grid.Row centered>
                <Container>
                    <h1> Reset Password</h1>
                </Container>
            </Grid.Row>
            <Container>
                <Card ui='true' centered style={{ marginTop: 30 }}>
                    <Card.Content>
                        <Card.Header>
                            <Icon name='user circle' />
                            Reset Password
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field
                                type='email'
                                control={Input}
                                id='email'
                                //name='name'
                                label='Email Address'
                                placeholder='Enter email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            {/* <Form.Field
                                type='password'
                                control={Input}
                                id='password'
                                //name='name'
                                label='Password'
                                ///placeholder=''
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            /> */}
                            <Form.Button
                                fluid
                                loading={loading}
                                disabled={!email || !password || !loading}
                            >
                                Login
                            </Form.Button>
                        </Form>
                    </Card.Content>
                    <Card.Content>
                        Need to create an account? &nbsp; <Link href='/register'>Register</Link>{"\n"}
                        <Link href='/forgot-password'>Forgot Password?</Link>
                    </Card.Content>
                </Card>
            </Container>
        </Grid>

        </>
    )


};

