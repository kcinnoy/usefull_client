import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Card, Container, Grid, Dimmer, Loader, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from '../../context';
import { useRouter } from 'next/router';
//import AccountRoute from '../../components/routes/AccountRoute';

const StripeCallback = () => {
    const {state: {user}, dispatch,} = useContext(Context)

    useEffect(() => {
        if(user) {
            axios.post('/api/get-account-status').then(res => {
                dispatch({
                    type: 'LOGIN',
                    payload: res.data,
                });
                window.localStorage.setItem('user', JSON.stringify(res.data));
                window.location.href = '/linkcard'
                //console.log(res);
               
            })
        }
    },[user])

    return (
        <> 
            <Dimmer active>
                    <Loader indeterminate></Loader>
            </Dimmer>
        </>
    )
}

export default StripeCallback;