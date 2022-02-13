import {
    Form,
    Container,
    Grid,
    Header,
    Radio,
    Segment,
    Input,
    Label,
    TextArea,
    Button,
    Icon,
    Image,
    Placeholder,
    Modal,
    Progress,
} from 'semantic-ui-react';

export default function CreateShowcaseForm({
    showcaseValues,
    setShowcaseValues,
    handleAddShowcase,
    uploading,
    uploadButtonText,
    handleMedia,
    progress,
    handleRemoveShowcase,
}) {
    return (
        <Container>
         
            <Form onSubmit={handleAddShowcase}>
            
                <Form.Field
                    width={16}
                    type='text'
                    control={Input}
                    id='title'
                    name='title'
                    label='Title'
                    placeholder='Title'
                    value={showcaseValues.title}
                    onChange={e => setShowcaseValues({ ...showcaseValues, title: e.target.value })}
                />
                
                <Form.Field
                    type='TextArea'
                    control={Input}
                    id='content'
                    name='content'
                    label='Content'
                    placeholder='Add a short description'
                    value={showcaseValues.content}
                    onChange={e =>
                        setShowcaseValues({ ...showcaseValues, content: e.target.value })
                    }
                />
                <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>

               { !showcaseValues.video.Location &&
                   (<Button as='label' htmlFor='file' type='button'>
                    <Button.Content visible>
                        <Icon name='file' />
                    </Button.Content>
                    <Button.Content >{uploadButtonText}</Button.Content>
                </Button>)}
                {!uploading && showcaseValues.video.Location &&
                    <Label as='a' onClick={handleRemoveShowcase}>
                        {uploadButtonText}
                        <Icon name='delete' />
                    </Label>
                }
                { progress > 0 && 
                    <Progress
                    style={{ marginTop: 10 }}
                        percent={progress}
                        color='olive'
                 
                    />
                        
                }
                </Grid.Column >
                <Grid.Column width={8} textAlign='right'>
             
                <Input type='file' accept='video/*' id='file' hidden onChange={handleMedia} />
                <Form.Button
                    content='Submit'
                    //fluid
                    loading={uploading}
                    //disabled={!email || !password}
                />
                </Grid.Column>

               
                </Grid.Row>
                </Grid>
            </Form>
      
        </Container>
    );
}
