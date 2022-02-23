import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import linkcard from '../../usefull_server/models/linkcard'
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
import LinkcardView from '../components/cards/Linkcard';




export default function index({linkcards}) {
    // const [linkcards, setLinkcards] = useState([]);
    // const [showLinkcard, setShowLinkcard] = useState(false);

    // useEffect(() => {    
    //     fetchLinkcards();
    // }, []);

    // const fetchLinkcards = async () => {
    //     const {data} = await axios.get('/api/linkcards');
    //     setLinkcards(data);
    //     setShowLinkcard(true);      
    //     console.log('asnc:', data);
    // };

    return (
        <div>
            {linkcards &&

        (<Container style={{ marginTop: 20 }}>
             <Grid>
                 <Grid.Row>

                 {linkcards.map((lc) => (
                     <div key={lc._id}>
                        {/* {<pre>{JSON.stringify(lc, null, 4)} </pre>} */}
                        <LinkcardView linkcard={lc}/>

                     </div>
                 ))    
                }
                 </Grid.Row>
       
             </Grid>
        </Container>)
            }
        </div>
    )
}

export async function getServerSideProps() {
    const {data} = await axios.get(`${process.env.API}/linkcards`);

    return {
        props: {
            linkcards: data,
        },
    };
}
