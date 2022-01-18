// _app.js used to initialize pages.
// *before users sees page.
// *can add 3rd party files
import NavBar from '../components/NavBar';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
    return (
        <>  
            <ToastContainer position='top-right'/>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
