import {
    Card,
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
import Link from 'next/link';
import currencyFormatter from '../../utils/helpers';

export default function LinkcardView({linkcard}) {
     const {name, account, price, image, slug, paid, category} = linkcard;
    return (
        <Link href={`/linkcard/${slug}`}> 
            <Card>
                <Image src={image.Location}/>
                <Card.Content>
                    <Card.Header>
                        {name}
                    </Card.Header>
                    <Card.Meta>
                        {category} {paid ? `£${price}` : 'Free'}
                    </Card.Meta>

                </Card.Content>

            </Card> 
        </Link>
    )
}
