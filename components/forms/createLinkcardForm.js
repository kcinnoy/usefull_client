import {useState, useEffect} from 'react';
import { Container, Grid, Form, Radio, Segment, Input, Label, TextArea, Button, Icon, Image } from 'semantic-ui-react';

const options = [
    {key: 'basic', text: '£10', value: 10},
    {key: 'professional', text: '£20', value: 20},
    {key: 'premium', text: '£30', value: 30},
];

const CreateLinkcardForm = ({
    handleSubmit, handleImage, handleChange, values, setValues, preview, fileName
}) => (

        <div>
               <Grid padding='true'>
        <Grid.Row centered>
            <Container>
                <h1> Create New Link Card</h1>
            </Container>
        </Grid.Row>
        <Container>
                    <Form >
                    <Segment secondary >
                    <Label attached='top left'>Name</Label>
                        <Form.Field
                            //inline
                            type='text'
                            control={Input}
                            id='name'
                            name='name'
                            //label='name'
                            //placeholder=''
                            value={values.name}
                            onChange={handleChange}
                        />
                    </Segment>
                    <Segment secondary >
                    <Label attached='top left'>Description</Label>
                        <Form.Field
                            //inline
                            //type='textarea'
                            control={TextArea}
                            id='description'
                            //name='name'
                            //label='Description'
                            placeholder='Description'
                            value={values.description}
                            onChange={handleChange}
                        />
                    </Segment>
                    <Segment secondary >
                    <Label attached='top left'>Category</Label>
                        <Form.Field
                            //inline
                            type='text'
                            control={Input}
                            id='Category'
                            //name='name'
                            //label='Description'
                            placeholder='Category'
                            value={values.category}
                            onChange={handleChange}
                        />
                    </Segment>
                    <Segment secondary>
                    <Label attached='top left'>Pricing</Label>
                    <Form.Group inline>
                        <Form.Field
                            control={Radio}
                            label='Free'
                            value='Free'
                            checked={values.paid === false}
                            onChange={v => setValues({...values, paid: !values.paid})}
                        />
                        <Form.Field
                            control={Radio}
                            label='Paid'
                            value='Paid'
                            checked={values.paid === true}
                            onChange={v => setValues({...values, paid: !values.paid})}
                        />
                        {values.paid &&
                        <Form.Select
                            fluid
                            //label='Gender'
                            options={options}
                            placeholder='Set Price'
                        />
                        }
                    </Form.Group>     
                    </Segment>
                    <Segment secondary>
                   
                    <Form.Group inline>  
                        <Button as="label" htmlFor="file" type="button">
                            <Button.Content visible>
                            <Icon name="file" />
                        </Button.Content>
                        <Button.Content hidden>Choose a File</Button.Content>
                        </Button>
                        <input
                            type="file"
                            id="file"
                            hidden
                            onChange={handleImage}
                        />
                         {preview && (
                        <Image src={preview} size='medium' size='tiny' rounded/>
                        //'Image goes here'
                    )}

                </Form.Group>  
                    </Segment>
                        <Form.Button
                            fluid
                            //loading={loading}
                            disabled={values.loading|| values.uploading}
                        >
                            {values.loading ? 'Saving..' : 'Save and Continue'}
                        </Form.Button>
                </Form>
        </Container>
    </Grid>
        </div>

);


export default  CreateLinkcardForm