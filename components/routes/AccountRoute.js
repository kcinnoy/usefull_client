import {useEffect, useState, } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import { Dimmer, Loader, Grid, Container } from 'semantic-ui-react';
import AccountGrid from '../business/account/AccountGrid';



const AccountRoute = ({ children }) => {
    //state
    const [hiddenView, setHiddenView] = useState(true);

    // router
    const router = useRouter();


    useEffect(() => {
        fetchAccount();
    }, []);


    const fetchAccount = async () => {
        try {
          const { data } = await axios.get("/api/current-account");
          console.log(data);
          if (data.ok) setHiddenView(false);
        } catch (err) {
          console.log(err);
          setHiddenView(true);
          router.push('/login');
        }
      };

    return (
        <>  
          {
            hiddenView ? 
            (<div>
              <Dimmer active>
                <Loader indeterminate>Please Login to view this page</Loader>
              </Dimmer>
          </div>)
            : (
               <Grid container centered>
                <Grid.Row>
                    <AccountGrid/>
                </Grid.Row>
                <Grid.Row>
                    <Container>
                        {children}
                    </Container>
                </Grid.Row>
               
               
               </Grid> 
                
            )
            }
        </>
    )
};

export default AccountRoute;