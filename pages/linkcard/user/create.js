import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Card, Container, Grid, Form, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from "../context";
import { useRouter } from 'next/router';



export default function CreateLinkCard() {
    return (
        <>
           <h1> Create New Link Card</h1> 
        </>
    )
}
