
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
// import styles from '@/styles/Navbar.module.css';
import { Menu, Container, Grid, Icon } from 'semantic-ui-react';
// import Search from './Search';
// import AuthContext from '@/context/AuthContext';
import { Context } from '../context';
import  axios from 'axios';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';

export default function Navbar() {
    const {state, dispatch} = useContext(Context)
    const router = useRouter()

    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
       process.browser && setActiveItem(window.location.pathname);
       console.log(window.location.pathname);
    }, [process.browser && window.location.pathname ])

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
      };

    return (
        <Grid padded>
        <Menu inverted fluid>
            <Container>
                <Link href='/' passHref>
                    <Menu.Item
                        name='' 
                        as='a' 
                        header
                        active={activeItem === '/'}
                        onClick={(e) => setActiveItem(`/${e.name}`) }
                    >
                        Usefull
                    </Menu.Item>
                </Link>
                
                {/* <Search /> */}
                <Link href='/events' passHref>
                    <Menu.Item
                        name='events' 
                        as='a'
                        header
                        active={activeItem === '/'+'events'}
                        onClick={(e) => setActiveItem(`/${e.name}`) }
                    >
                        Events
                    </Menu.Item>
                </Link>

                <Menu.Menu position='right'>
                <Link href='/login' passHref>
                    <Menu.Item
                        name='login' 
                        as='a' 
                        header
                        active={activeItem === '/'+'login'}
                        onClick={(e) => setActiveItem(`/${e.name}`) }
                    >
                    <Icon name='user circle' />
                        Login
                    </Menu.Item>
                </Link>
                <Menu.Item
                        name='logout' 
                        as='a' 
                        header
                        //active={activeItem === '/'+'login'}
                        onClick={logout}
                    >
                    <Icon name='user circle' />
                        Logout
                    </Menu.Item>
                <Link href='/register' passHref>
                    <Menu.Item
                        name='register' 
                        as='a'
                        header 
                        active={activeItem === '/'+'register'}
                        onClick={(e) => setActiveItem(`/${e.name}`) }
                    >
                    <Icon name='user circle' />
                        Register
                    </Menu.Item>
                </Link>
                </Menu.Menu>
                
            </Container>
        </Menu>
        </Grid>
    );
}
