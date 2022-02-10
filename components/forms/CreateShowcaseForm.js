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
    Modal
} from 'semantic-ui-react';

export default function CreateShowcaseForm({
    showcaseValues,
    setShowcaseValues,
    handleAddShowcase,
    uploading,
    uploadButtonText,
    handleMedia,
}) {
    return (
        <Container>
            <Form onSubmit={handleAddShowcase}>
                <Form.Field
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

                <Button as='label' htmlFor='file' type='button'>
                    <Button.Content visible>
                        <Icon name='file' />
                    </Button.Content>
                    <Button.Content hidden>{uploadButtonText}</Button.Content>
                </Button>
                <Input type='file' accept='video/*' id='file' hidden onChange={handleMedia} />
                <Form.Button
                    content='Submit'
                    //fluid
                    loading={uploading}
                    //disabled={!email || !password}
                />
            </Form>
        </Container>
    );
}
