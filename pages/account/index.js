import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { Context } from '../../context';
import AccountRoute from '../../components/routes/AccountRoute';
import { Card, Button, Label, Container, Grid, Form, Placeholder, Icon, Item } from 'semantic-ui-react';


const AccountIndex = () => {
    const [linkcards, setLinkcards] = useState([]);

    useEffect(() => {
        loadLinkcards();
    }, []);

    const loadLinkcards = async () => {
        const { data } = await axios.get('/api/account-linkcards');
        setLinkcards(data);
    };

    const {
        state: { user }
    } = useContext(Context);

    return (
        <AccountRoute>
            <h1> Account Page </h1>
            <>
                {/* <pre> {JSON.stringify(user)}</pre> */}
                {/* <pre> {JSON.stringify(linkcards, null, 4)}</pre> */}
                {linkcards &&
                    linkcards.map(linkcard => (
                    
                        <> 
                            <Card fluid>
                                <Card.Content textAlign='left'>
                                    <Item.Group>
                                    <Item>
                                        <Item.Image
                                            size='tiny'
                                            src={linkcard.image ? linkcard.image.Location : null }
                                        />

                                        <Item.Content floated='left'>
                                        <Link href={`${linkcard.slug}`} passHref>
                                            <Item.Header  as='a' >{linkcard.name}</Item.Header>
                                        </Link>
                                            <Item.Description>
                                            <Placeholder>
                                                <Placeholder.Paragraph>
                                                    <Placeholder.Line />
                                                    <Placeholder.Line />
                                                </Placeholder.Paragraph>
                                            </Placeholder> 
                                            </Item.Description>
                                            <Item.Extra>
                                            {linkcard.published == true && (
                                                <Label as='a'>
                                                Published
                                                <Icon name='delete' />
                                                </Label>
                                            )}    
                                        </Item.Extra>
                                        </Item.Content>
                                        
                                    </Item>
                                    </Item.Group>
                                </Card.Content>
                            </Card>
                        </>
                    ))}
            </>
        </AccountRoute>
    );
};

export default AccountIndex;
