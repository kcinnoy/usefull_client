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

export default function SingleShowcaseMain({ showcases, setPreview, preview }) {
    return (
        <Segment>
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign='left'>
                        {showcases ? (
                            showcases.map((sc, index) => (
                                <List>
                                    <List.Item>
                                        <List.Icon name='marker' />
                                        <List.Content>
                                            <List.Header as='a'>{sc.title}</List.Header>
                                            <List.Description>{sc.content}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            ))
                        ) : (
                            <Placeholder>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}
