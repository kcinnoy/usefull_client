import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Card, Container, Grid, Button, Form, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from '../../context';
import { useRouter } from 'next/router';
//import AccountRoute from '../../components/routes/AccountRoute';

export default function PaymentsPage() {
    const [loading, setLoading] = useState(false);
    const {
        state: { user }
    } = useContext(Context);

    const handleSetupPayments = () => {
        axios.post('/api/setup-payments')
        .then((res) => {
            console.log(res);
            window.location.href = res.data;
        })
        .catch((err) => {
            console.log(err.response.status);
            toast('Stripe onboarding failed. Try again');
        });
    };

    return (
        <>
            <Grid padding='true'>
                <Grid.Row centered>
                    <Container>
                        <h1> Payments</h1>
                        <h3>Receive payments for your bookings</h3>
                        <Button 
                            icon
                            labelPosition='left'
                            onClick={handleSetupPayments}                  
                        >
                            <Icon name='settings' />
                            Set-up payments via Stripe 
                        </Button>
                    </Container>
                </Grid.Row>
            </Grid>
        </>
    );
}
