
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

export default function SingleLinkcardMain({
    linkcard,
    preview,
    setPreview,
    user,
    handlePaidEnrollment,
    handleFreeEnrollment,
}) {
    
    const {
        name,
        description,
        account,
        updatedAt,
        showcases,
        image,
        price,
        paid,
        category,
    } = linkcard;
    
    return (
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        {showcases[0].video && showcases[0].video.Location ?
                                        (
                                            <div>
                                                <ReactPlayer
                                                    url={showcases[0].video.Location}
                                                    width='100%'
                                                    height='225px'
                                                    light={image.Location}
                                                />
                                            </div>
                                        ) 
                                        : 
                                        (
                                            <Image
                                                src={image ? image.Location : '/'}
                                                size='tiny'
                                            />
                                        )
                                    }


                                        
                                    </Grid.Column>
                                    <Grid.Column width={12} textAlign='left'>
                                        <Header size='small'>
                                            <span>
                                                {name}
                                                <span style={{ marginLeft: 10 }}>
                                                    <Label 
                                                        icon='edit outline'
                                                        content={paid ? `£${price}`: 'Free'}
                                                        color='basic'      
                                                    />
                                                    <Button 
                                                        icon='check square outline'
                                                        content={user ? 'Enroll' : 'Login to Enroll'}
                                                        //onClick={() => router.push(`/account/linkcard/edit/${slug}`)}
                                                        onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                                                        color='basic'      
                                                    />
                                                </span>
                                            </span>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16} textAlign='left'>
                                      {description}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        
                                    </Grid.Column>
                                </Grid.Row>
                                
                            </Grid>
                </Segment>            
    )
}


