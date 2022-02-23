import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {
    Container,
    Grid,
    Header,
    List,
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
import ReactPlayer from 'react-player';
import SingleLinkcardMain from '../../components/cards/SingleLinkcardMain';
import SingleShowcaseMain from '../../components/cards/SingleShowcaseMain';
import {Context} from '../../context';



export default function  SingleLinkcard({linkcard})  {
    
    //state
    const [preview, setPreview] = useState('');

    //context
    const {
        state: {user},
    } = useContext(Context);

    const router = useRouter();
    const {slug} = router.query;

    const handlePaidEnrollment = () => {
        console.log('handle paid enrollment');
    }

    const handleFreeEnrollment = () => {
        console.log('handle free enrollment');
    }

   
    return (

        <div>
            
                
                <Container style={{ marginTop: 30 }}>
                    <Segment.Group>
                        {/* <pre>{JSON.stringify(linkcard, null, 4)}</pre> */}
                            <SingleLinkcardMain 
                                linkcard={linkcard}
                                preview={preview}
                                setPreview={setPreview}
                                user={user}
                                handlePaidEnrollment={handlePaidEnrollment}   
                                handleFreeEnrollment={handleFreeEnrollment} 
                            />

                            {linkcard.showcases && (
                                <SingleShowcaseMain 
                                    showcases={linkcard.showcases}
                                    preview={preview}
                                    setPreview={setPreview}
                                />
                            )}
                    </Segment.Group>
                </Container>
                </div>
    
    );
}

export async function getServerSideProps({query}) {
    const {data} = await axios.get(`${process.env.API}/linkcard/${query.slug}`);
    return {
        props: {
            linkcard: data,
        },
    };
}


