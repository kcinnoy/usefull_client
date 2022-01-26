
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
// import styles from '@/styles/Navbar.module.css';
import { Menu, Container, Grid, Icon, Dropdown } from 'semantic-ui-react';
// import Search from './Search';
// import AuthContext from '@/context/AuthContext';
import { Context } from '../context';
import  axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Navbar() {
    const {state, dispatch} = useContext(Context);
    const {user} = state; 
    const router = useRouter();

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

                { !user ? (

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

                ) : (
                // <Menu.Menu position='right'>
                      
                //     <Menu.Item
                //         name='logout' 
                //         as='a' 
                //         header
                //         //active={activeItem === '/'+'login'}
                //         onClick={logout}
                //     >
                //     <Icon name='user circle' />
                //         Logout
                //     </Menu.Item>
                // </Menu.Menu>
                
                <Menu.Menu position='right'>
                <Dropdown 
                    trigger={<span><Icon name='user'/>{user && user.username}</span>}
                    //className='icon'
                    //icon='edit'
                    item
                    // text={user && user.username}
                >
                {/* <Icon name='user circle' /> */}
                <Dropdown.Menu>
                    <Dropdown.Item 
                        icon='user circle'
                        text='Logout' 
                        onClick={logout}
                    />
                    <Link href='/user' passHref>
                    <Dropdown.Item 
                        icon='globe'
                        text='Dashboard' 
                    />
                    </Link>
                    <Dropdown.Item icon='settings' text='Account Settings' />
                    
                </Dropdown.Menu>
                
                </Dropdown>
                </Menu.Menu>

                )}

               
                
            </Container>
        </Menu>
        </Grid>
    );
}
