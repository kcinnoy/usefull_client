import ReactPlayer from 'react-player';
import {
    Form,
    Container,
    Grid,
    Input,
    Radio,
    Checkbox,
    TextArea,
    Button,
    Icon,
    Progress,
} from 'semantic-ui-react';

export default function UpdateShowcaseForm({
    selectedValue,
    setSelectedValue,
    selected,
    setSelected,
    handleUpdateShowcase,
    uploading,
    handleVideoUpload,
    uploadVideoText,
    progress,
}) {
    return (
        <Container>
            {/* {JSON.stringify(selectedValue)} */}
         
            <Form onSubmit={handleUpdateShowcase}>
            
                <Form.Field
                    width={16}
                    type='text'
                    control={Input}
                    id='title'
                    name='title'
                    label='Title'
                    placeholder='Title'
                    value={selectedValue.title}
                    onChange={e => setSelectedValue({ ...selectedValue, title: e.target.value })}
                />
                
                <Form.Field
                    type='TextArea'
                    control={Input}
                    id='content'
                    name='content'
                    label='Content'
                    placeholder='Add a short description'
                    value={selectedValue.content}
                    onChange={e =>
                        setSelectedValue({ ...selectedValue, content: e.target.value })
                    }
                />
                <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        { 
                            (<Button as='label' htmlFor='video' type='submit'>
                                <Button.Content visible>
                                    <Icon name='file' />
                                </Button.Content>
                                <Button.Content >{uploadVideoText}</Button.Content>
                            </Button>)
                            }
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='right'>
                        <Input type='file' accept='video/*' id='video' hidden onChange={handleVideoUpload} />
                        <Form.Button
                            content='Submit'
                            //fluid
                            loading={uploading}
                            //disabled={!email || !password}
                        />
                    </Grid.Column>
                <Grid.Row>
                <Grid.Column width={8}>

                </Grid.Column>
                <Grid.Column width={8}>
                    <Radio 
                        toggle
                        //name='free preview'
                        onChange={(v, data) => setSelectedValue({...selectedValue, free_preview:data.checked})}
                        //onChange={(v, data) => console.log(data.checked, selectedValue.free_preview)}
                    
                    />
                </Grid.Column>

            </Grid.Row>
                <Grid.Column>
                {!uploading && selectedValue.video && selectedValue.video.Location && (
                    <div>
                        <ReactPlayer
                            url={selectedValue.video.Location}
                            width='410px'
                            height='240px'
                            controls
                        />
                    </div>
                ) 
                }
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                    { progress > 0 && 
                        <Progress
                        style={{ marginTop: 10 }}
                            percent={progress}
                            color='olive'
                    
                        />   
                    }
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            </Form>
      
        </Container>
    );
}
