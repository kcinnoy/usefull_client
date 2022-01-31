import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Container, Grid, Form, Radio, Segment, Input, Label, TextArea } from 'semantic-ui-react';
import axios from 'axios';
//import { ToastContainer, toast } from 'react-toastify';
//import { Context } from "../context";
import { useRouter } from 'next/router';
import CreateLinkcardForm from '../../../components/forms/createLinkcardForm';



export default function CreateLinkCard() {
    // state
    const [values, setValues] = useState({
        name: '',
        description: '',
        value_proposition: '',
        category: '',
        price: '9.99',
        uploading: false,
        paid: true,
        loading: false,
    });

    const [preview, setPreview] = useState('')

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleImage = (e) => {
        setPreview(window.URL.createObjectURL(e.target.files[0]));
        console.log('p:',preview)
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }

    return (
        <>
           <h1> Create New Link Card</h1> 
           <div>
               <CreateLinkcardForm
               handleSubmit={handleSubmit}
               handleChange={handleChange}
               handleImage={handleImage}
               values={values}
               setValues={setValues}
               preview={preview}    
               />
           </div>
        </>
    )
}
