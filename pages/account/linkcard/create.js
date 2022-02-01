import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { Container, Grid, Form, Radio, Segment, Input, Label, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { Context } from "../context";
import { useRouter } from 'next/router';
import CreateLinkcardForm from '../../../components/forms/createLinkcardForm';
import Resizer from 'react-image-file-resizer';

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
        loading: false
    });
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');
    const [fileName, setFileName] = useState('');

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleImage = e => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(e.target.files[0]));
        setFileName(file.name)
        setValues({...values, loading:true});
        
        //resizer
        Resizer.imageFileResizer(file, 500, 500, 'jpeg', 100, 0, async (uri) => {
            try {
                let {data} = await axios.post('/api/linkcard/upload-image', {
                    image: uri,
                });
                console.log('image', data);
                setValues({...values, loading:false});


            } catch (err) {
                console.log(err)
                setValues({...values, loading: false})
                toast('Image upload fail')
            }
        })
        
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values);
    };

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
                    fileName={fileName}
                />
            </div>
        </>
    );
}
