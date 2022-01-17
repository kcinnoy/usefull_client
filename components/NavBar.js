
import Link from 'next/link';
// import {useContext} from 'react';
// import styles from '@/styles/Navbar.module.css';
import { Menu, Container, Grid } from 'semantic-ui-react';
// import Search from './Search';
// import AuthContext from '@/context/AuthContext';

export default function Navbar() {
    // const {user, logout} = useContext(AuthContext)

    return (
        <Grid padded>
        <Menu inverted fluid>
            <Container>
                <Link href='/' passHref>
                    <Menu.Item as='a' header>
                        Usefull
                    </Menu.Item>
                </Link>
                
                {/* <Search /> */}
                <Link href='/events' passHref>
                    <Menu.Item as='a' header >
                        Events
                    </Menu.Item>
                </Link>
                
            </Container>
        </Menu>
        </Grid>
    );
}
