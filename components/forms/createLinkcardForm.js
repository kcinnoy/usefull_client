import {useState, useEffect} from 'react';
import { Container, Grid, Form, Radio, Segment, Input, Label, TextArea, Button, Icon, Image } from 'semantic-ui-react';

const options = [
    {key: 'basic', text: '£10', value: 10},
    {key: 'professional', text: '£20', value: 20},
    {key: 'premium', text: '£30', value: 30},
];

const CreateLinkcardForm = ({
    handleSubmit,
    handleImage,
    handleChange,
    values,
    setValues,
    preview,
    fileName,
    handleImageRemove,
    editPage = false,
}) => (
   
        <>
            {values && (
               <Grid padding='true'>
        <Grid.Row centered>
            <Container>
                { editPage ? <h1> Link Card</h1> :
                <h1> Create New Link Card</h1>
                }
            </Container>
        </Grid.Row>
        <Container>
                    <Form onSubmit={handleSubmit}>
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
                            name='description'
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
                            id='category'
                            name='category'
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
                            onChange={v => setValues({...values, paid: !values.paid, price: 0})}
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
                            options={options}
                            placeholder='Set Price'
                            value={values.price}
                            onChange={(e, data) => setValues({ ...values, price: data.value})}
                            //onChange={onSelectChange}
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
                           
                            <Image 
                                onClick={(e) => {
                                    if (e.target.nodeName === "IMG") {
                                      //console.log('image clicked');
                                    } else {
                                      handleImageRemove(e);
                                    }
                                  }}
                                src={preview}
                                size='medium'
                                size='tiny'
                                label={{ as: 'a', corner: 'right', icon: 'remove circle'} }
                                rounded
                            />
                           
                          
                        //'Image goes here'
                    )}

                    {editPage && values.image &&
                        <Image 
                            onClick={(e) => {
                                if (e.target.nodeName === "IMG") {
                                } else {
                                handleImageRemove(e);
                                }
                            }}
                            src={values.image.Location}
                            size='medium'
                            size='tiny'
                            label={{ as: 'a', corner: 'right', icon: 'remove circle'} }
                            rounded
                        />
                    
                    
                    }

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
    )}
    </>

);


export default  CreateLinkcardForm