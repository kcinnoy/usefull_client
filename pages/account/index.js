import { useContext} from 'react';
import {Context} from '../../context';
import AccountRoute from '../../components/routes/AccountRoute';

const UserIndex = () => {
  
    const {
        state: {user},
    } = useContext(Context);

    return (
        <AccountRoute>
                <>
                    <h1> USER PAGE </h1>
                    <pre> {JSON.stringify(user)}</pre>
                </>
        </AccountRoute>
    )
};

export default UserIndex;