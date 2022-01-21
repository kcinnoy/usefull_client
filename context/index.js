import {useReducer, createContext, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

// initial state
const initialState =  {
    user: null,
};


// create context
const Context = createContext() 

// root recucer
const rootReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload};
        case 'LOGOUT':
            return {...state, user: null };
        default:
            return state;
    }
};

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: 'LOGIN',
            payload: JSON.parse(window.localStorage.getItem('user')),
        });
    }, []);

    //intercepters 
    axios.interceptors.response.use(
        function(response) {
            // any status code in 2xx range will be a trigger
            return response;
        }, 
        function (error) {
            // non 2xx status codes will be a trigger
            let res = error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get('/api/logout')
                    .then((data) => {
                        console.log('/401 error > logout');
                        dispatch({type: 'LOGOUT'});
                        window.localStorage.removeItem('user');
                        router.push('/login');


                    })
                    .catch (err => {
                        console.log('Axios Interceptor Err:', err)
                        reject(error);
                    })
                })

            }
            return Promise.reject(error);

        } 
    );

    //include Token when making requests via axios 
    useEffect(() => {
        const getCsrfToken = async () => {
            const{data} = await axios.get('/api/csrf-token')
            axios.defaults.headers['X-CSRF+Token'] = data.getCsrfToken;
        };
        getCsrfToken();
    }, []);
    


    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    );
};

export {Context, Provider};