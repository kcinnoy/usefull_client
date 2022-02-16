import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import {
    Container,
    Grid,
    List,
    Placeholder,
    Form,
    Radio,
    Segment,
    Input,
    Label,
    TextArea
} from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { Context } from "../context";
import { useRouter } from 'next/router';
import CreateLinkcardForm from '../../../../components/forms/createLinkcardForm';
import Resizer from 'react-image-file-resizer';

export default function EditLinkCard() {
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
        showcases: []
    });
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState('');
    const [fileName, setFileName] = useState('');

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadLinkcard();
    }, [slug]);

    const loadLinkcard = async () => {
        const { data } = await axios.get(`/api/linkcard/${slug}`);
        if (data && data.image) setImage(data.image);
        if (data)setValues(data);
    };

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    //const onSelectChange = (evt, data) => {
    //console.log( data.value);
    //}

    const handleImage = e => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(e.target.files[0]));
        setFileName(file.name);
        setValues({ ...values, loading: true });

        //resizer
        Resizer.imageFileResizer(file, 500, 500, 'jpeg', 100, 0, async uri => {
            try {
                let { data } = await axios.post('/api/linkcard/upload-image', {
                    image: uri
                });
                //console.log('image', data);
                setImage(data);
                setValues({ ...values, loading: false });
            } catch (err) {
                //console.log(err)
                setValues({ ...values, loading: false });
                toast('Image upload fail');
            }
        });
    };

    const handleImageRemove = async e => {
        //console.log('remove image ')
        e.preventDefault();
        try {
            setValues({ ...values, loading: true });
            const res = await axios.post('/api/linkcard/remove-image', { image });
            setImage({});
            setPreview('');
            setFileName('');
            setValues({ ...values, loading: false });
        } catch (err) {
            //console.log(err)
            setValues({ ...values, loading: false });
            toast('Image upload fail');
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            //console.log(values);
            const { data } = await axios.put(`/api/linkcard/${slug}`, {
                ...values,
                image
            });
            toast('Linkcard updated!');
            //router.push("/account");
        } catch (err) {
            toast(err.response.data);
        }
    };

    const handleDrag = (e, index) => {
        //console.log('on drag', index);
        e.dataTransfer.setData('itemIndex', index);
    }

    const handleDrop = async (e, index) => {
        //console.log('on drop', index);
        const movingItemIndex = e.dataTransfer.getData('itemIndex');
        const targetItemIndex  = index;
        let allShowcases = values.showcases;

        let movingItem = allShowcases[movingItemIndex];
        allShowcases.splice(movingItemIndex, 1 );
        allShowcases.splice(targetItemIndex, 0,movingItem);

        setValues({...values, showcases: [...allShowcases]});

        //save new showcase order to db
        const {data} = await axios.put(`/api/linkcard/${slug}`, {
            ...values,
            image,
        });

    };

    return (
        <Grid>
            <h1> Update Link Card</h1>
                <Grid.Row>
                <CreateLinkcardForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleImage={handleImage}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    fileName={fileName}
                    handleImageRemove={handleImageRemove}
                    editPage={true}
                    //onSelectChange={onSelectChange}
                />
                </Grid.Row >
                
                    <Container style={{ marginTop: 50 }}>
                    <Grid.Row>
                        
                        {/* {linkcard.showcases[0] && linkcard.showcases[0].title} */}

                        <Grid.Column textAlign='left'>
                            {values ? (
                                <List onDragOver={(e) => e.preventDefault()}>
                                {values.showcases.map((sc, index )=> (
                                    
                                        <List.Item
                                        key={index}
                                        draggable
                                        onDragStart={e => handleDrag(e, index)}
                                        onDrop={e => handleDrop(e, index)}       
                                        >
                                            <List.Icon name='marker' />
                                            <List.Content>
                                                <List.Header as='a'>{sc.title}</List.Header>
                                                <List.Description>{sc.content}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                    
                                ))}
                                </List>
                            ) : (
                                <Placeholder>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    </Container>
            
       
       </Grid>
    );
}
