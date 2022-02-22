import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import {
    Container,
    Grid,
    List,
    Placeholder,
    Icon,
    Button,
    Accordion,
    Header,
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
import UpdateShowcaseForm from '../../../../components/forms/UpdateShowcaseForm';

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
    const [active, setActive] = useState(true);
    const [selected, setSelected] = useState(-1);
    const [selectedValue, setSelectedValue] = useState(
        {
            content: '',
            free_preview: false,
            slug: '',
            title: '',
            video: {},
            _id: ''
        }
    )
    const [uploadVideoText, setUploadVideoText] = useState('Upload video');
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

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

    const handleDelete = async (index) => {
        const answer = window.confirm('Are you sure you want to delete?') 
        if(!answer) return;
        let allShowcases = values.showcases;
        const removed = allShowcases.splice(index, 1);
        setValues({...values, showcases: allShowcases});
        // send request to server
        try {
        const {data} = await axios.put(`/api/linkcard/${slug}/${removed[0]._id}`)
        } catch (err) {
            console.log(err)
        }

    }

    const handleAccordion  = (e, index) => {
        console.log(active)
        console.log(index)
        console.log('start:', selected)
        e.preventDefault();
        setActive(!active);
        setSelected(index);
        setSelectedValue(values.showcases[index]);
        console.log(values.showcases[index])
        console.log(selectedValue)
    }

    const handleVideoUpload = async (e)=> {
        //remove current video if present
        if(selectedValue.video && selectedValue.video.Location) {
            const res = await axios.post(`/api/linkcard/video-remove/${values.account._id}`,
            selectedValue.video
            );
            console.log('removed: ', res )
        }
        const file = e.target.files[0];
        setUploadVideoText(file.name);
        setUploading(true);

        // create form data
        const videoData = new FormData();
        videoData.append('video', file);
        videoData.append('linkcardId', values._id);

        // save progress bar and send video form data to backend 
        const {data} = await axios.post(`/api/linkcard/video-upload/${values.account._id}`,
            videoData,
            {
                onUploadProgress: (e) =>
                setProgress(Math.round((100 * e.loaded) / e.total))
            }
        );
        console.log(data)
        setSelectedValue({...selectedValue, video: data});
        setUploading(false);
    }

    const handleUpdateShowcase = async (e)=> {
        e.preventDefault;
        const {data} = await axios.put(`/api/linkcard/showcase/${slug}/${selectedValue._id}`,
            selectedValue
        );
        console.log('showcase updated');
        setUploadVideoText('Upload Video');
        setSelected(-1);
        toast('Showcase updated via handleupdateshowcase');
        // try {
        // const {data} = await axios.put(`/api/linkcard/showcase/${slug}/${selectedValue._id}`,
        //     selectedValue
        // );
        //     console.log('showcase updated');
        //     setUploadVideoText('Upload Video');
        //     setSelected(-1);
        //     toast('Showcase updated via handleupdateshowcase');
        // //setLinkcard(data);
        // } catch (err) {
        //     console.log(err)
        // };
        if (data.ok) {
            let showcases = values.showcases;
            const index = showcases.findIndex((el) => el._id === selectedValue._id);
            showcases[index] = selectedValue;
            setValues({ ...values, showcases: showcases });
            toast("Showcase updated");
        }
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
                                        draggable
                                        onDragStart={e => handleDrag(e, index)}
                                        onDrop={e => handleDrop(e, index, sc)}       
                                        >
                                            <Accordion>
                                                
                                                
                                               
                                                    <Accordion.Title
                                                        //active={activeIndex === 0}
                                                        key={sc}
                                                        icon='dropdown'
                                                        index={index}
                                                        onClick={e => handleAccordion(e, index)}
                                                        content={sc.title}
                                                        as='h2'
                                                    >
                                                
                                                    </Accordion.Title>
                                                    <List.Description>{sc.content}</List.Description>
                                                
                                                <Button floated='right'  basic compact fitted size='mini' onClick={() => handleDelete(index, sc)}>
                                                    <Icon name='close'/>
                                                </Button>
                                               
                                                <Accordion.Content 
                                                    active={active && selected == index}
                                                >
                                                    <UpdateShowcaseForm
                                                        selected={selected}
                                                        setSelected={setSelected}
                                                        selectedValue={selectedValue}
                                                        setSelectedValue={setSelectedValue}
                                                        handleUpdateShowcase={handleUpdateShowcase}
                                                        handleVideoUpload={handleVideoUpload}
                                                        uploadVideoText={uploadVideoText}
                                                        progress={progress}
                                                        uploading={uploading}
                                                    
                                                    />
                                                </Accordion.Content>
                                            </Accordion>
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
