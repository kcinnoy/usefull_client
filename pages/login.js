import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Card, Container, Grid, Form, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from "../context";
import { useRouter } from 'next/router';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // state 
    const {state: {user}, dispatch} = useContext(Context);
    //const {user} = state 

    // router
    const router = useRouter();

    useEffect(()=> {
        if(user !== null) router.push('/');
    }, [user])

    const handleSubmit = async e => {
        e.preventDefault();
      
        try {
            setLoading(true);
            //const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
            const { data } = await axios.post(`/api/login`, {
                email,
                password
            });
            dispatch({
                type: 'LOGIN',
                payload: data,
            });
            toast.success('Login Successful');
            // save in local storage
            window.localStorage.setItem('user', JSON.stringify(data));
            setLoading(false);
            router.push('/')

        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    return (
        <Grid padding='true'>
            <Grid.Row centered>
                <Container>
                    <h1> Login</h1>
                </Container>
            </Grid.Row>
            <Container>
                <Card ui='true' centered style={{ marginTop: 30 }}>
                    <Card.Content>
                        <Card.Header>
                            <Icon name='user circle' />
                            Login
                        </Card.Header>
                        {/* <ToastContainer /> */}
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
                            <Form.Field
                                type='password'
                                control={Input}
                                id='password'
                                //name='name'
                                label='Password'
                                ///placeholder=''
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Form.Button
                                fluid
                                loading={loading}
                                disabled={!email || !password}
                            >
                                Login
                            </Form.Button>
                        </Form>
                    </Card.Content>
                    <Card.Content>
                        Need to create an account? &nbsp; <Link href='/register'>Register</Link>
                    </Card.Content>
                </Card>
            </Container>
        </Grid>
    );

};