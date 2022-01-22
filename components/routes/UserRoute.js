import {useEffect, useState, } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import { Dimmer, Loader } from 'semantic-ui-react';



const UserRoute = ({ children }) => {
    //state
    const [hiddenView, setHiddenView] = useState(true);

    // router
    const router = useRouter();


    useEffect(() => {
        fetchUser();
    }, []);


    const fetchUser = async () => {
        try {
          const { data } = await axios.get("/api/current-user");
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
          {hiddenView ? 
            (<div>
              <Dimmer active>
                <Loader indeterminate>Please Login to view this page</Loader>
              </Dimmer>
          </div>)
            : (<>{children}</>)}
        </>
    )
};

export default UserRoute;