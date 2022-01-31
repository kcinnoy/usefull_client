import { useContext} from 'react';
import {Context} from '../../context';
import AccountRoute from '../../components/routes/AccountRoute';

const AccountIndex = () => {
  
    const {
        state: {user},
    } = useContext(Context);

    return (
        <AccountRoute>
                <>
                    <h1> Account Page </h1>
                    <pre> {JSON.stringify(user)}</pre>
                </>
        </AccountRoute>
    )
};

export default AccountIndex;