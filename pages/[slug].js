import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AccountRoute from '../components/routes/AccountRoute';
import { toast } from 'react-toastify';

import {
    Container,
    Grid,
    Header,
    Form,
    Radio,
    Segment,
    Input,
    Label,
    TextArea,
    Button,
    Icon,
    Image,
    Placeholder,
    Modal
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import CreateShowcaseForm from '../components/forms/CreateShowcaseForm';

const LinkcardView = () => {
    const [linkcard, setLinkcard] = useState({});

    //showcase state modal
    const [modalVisible, setModalVisible] = useState(false);

    //showcase state content
    const [showcaseValues, setShowcaseValues] = useState({
        title: '',
        content: '',
        video: {}
    });

    //showcase state upload
    const [uploading, setUploading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Media')
    const [progress, setProgress] = useState(0);

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadLinkcard();
    }, [slug]);

    const loadLinkcard = async () => {
        const { data } = await axios.get(`/api/linkcard/${slug}`);
        setLinkcard(data);
        console.log(linkcard);
    };

    const handleAddShowcase = e => {
        e.preventDefault();
        console.log(showcaseValues);
    };

    const handleMedia = async (e) => {
        try {
            setUploading(true)
            const file = e.target.files[0];
            setUploadButtonText(file.name);
            console.log('handle video upload')
            const videoData = new FormData()
            videoData.append('video', file)

            // progress bar and send video as form data to backend
            const {data} = await axios.post(`/api/linkcard/video-upload/${linkcard.account._id}`, videoData, {
                onUploadProgress: (e) => {
                    setProgress(Math.round((100 * e.loaded) / e.total))
                }
            })
            console.log(data)
            setShowcaseValues({...showcaseValues, video: data})
            setUploading(false)


        } catch (err) {
            setUploading(false)
            console.log(err);
            toast('Video upload failed');
        }
    };

    const handleRemoveShowcase = async () => {
        try {
            setUploading(true);
            const {data} = await axios.post(
                `/api/linkcard/video-remove/${linkcard.account._id}`, 
                showcaseValues.video
            );
            //console.log(data)
            setShowcaseValues({...showcaseValues, video: {}})
            setProgress(0);
            setUploadButtonText('Upload Media')
            setUploading(false);

            
        } catch (err) {
            setUploading(false)
            console.log(err);
            toast('Video remove failed');
        }
    }

    return (
        <AccountRoute>
            <div>
                <Container text>
                    <Segment.Group>
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Image
                                            src={linkcard.image ? linkcard.image.Location : '/'}
                                            size='tiny'
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={12} textAlign='left'>
                                        <Header size='small'>
                                            <span>
                                                {linkcard.name}
                                                <span style={{ marginLeft: 10 }}>
                                                    <Icon name='edit outline' color='blue' />
                                                    <Icon
                                                        name='check square outline'
                                                        color='green'
                                                    />
                                                </span>
                                            </span>
                                        </Header>
                                        <Placeholder>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16} textAlign='left'>
                                        <ReactMarkdown children={linkcard.description} />
                                        <Placeholder fluid>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Modal
                                            onClose={() => setModalVisible(false)}
                                            onOpen={() => setModalVisible(true)}
                                            open={modalVisible}
                                            trigger={<Button>Add Media</Button>}
                                            //dimmer='blurring'
                                        >
                                            <Modal.Header>
                                                Add Showcase Items
                                                <Button floated='right' circular basic compact fitted size='mini' onClick={() => setModalVisible(false)}>
                                                    <Icon name='close'/>
                                                </Button>
                                            </Modal.Header>
                                            <Modal.Content>
                                                <CreateShowcaseForm
                                                    showcaseValues={showcaseValues}
                                                    setShowcaseValues={setShowcaseValues}
                                                    handleAddShowcase={handleAddShowcase}
                                                    uploading={uploading}
                                                    uploadButtonText={uploadButtonText}
                                                    handleMedia={handleMedia}
                                                    progress={progress}
                                                    handleRemoveShowcase={handleRemoveShowcase}
                                                />
                                            </Modal.Content>
                                        </Modal>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Segment.Group>
                </Container>

                <pre>view {JSON.stringify(linkcard, null, 4)}</pre>
            </div>
        </AccountRoute>
    );
};

export default LinkcardView;
