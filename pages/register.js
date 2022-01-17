import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Card, Container, Grid, Form, Icon, Input } from 'semantic-ui-react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    const handleSubmit =(e) => {
        e.preventDefault();
        console.table({username,email, password});
    }

    return (
        <Grid padding>
            <Grid.Row centered>
                <Container >
                    <h1> Register</h1>
                </Container>
            </Grid.Row>
            <Container>
            <Card ui centered style={{ marginTop: 30 }}>
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
                            type='text'
                            control={Input}
                            id='username'
                            name='name'
                            label='Username'
                            //placeholder=''
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Field
                            type='email'
                            control={Input}
                            id='email'
                            //name='name'
                            label='Email Address'
                            placeholder='Enter emial'
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
                        <Form.Button fluid>Register</Form.Button>
                    </Form>
                </Card.Content>
                <Card.Content>
                    Already have an account? &nbsp; <Link href='/account/login'>Login</Link>
                </Card.Content>
            </Card>
            </Container>
        </Grid>
    );
}