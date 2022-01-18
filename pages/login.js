import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Card, Container, Grid, Form, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            //const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
            const { data } = await axios.post(`/api/login`, {
                email,
                password
            });
            //console.log('REGISTER RESPONSE',data)
            toast.success('Registration Successful');
            setLoading(false);
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
                            Register
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
                                disabled={!username || !email || !password || loading}
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
}
