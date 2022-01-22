import { useContext} from 'react';
import {Context} from '../../context';
import UserRoute from '../../components/routes/UserRoute';

const UserIndex = () => {
  
    const {
        state: {user},
    } = useContext(Context);

    return (
        <UserRoute>
                <>
                    <h1> USER PAGE </h1>
                    <pre> {JSON.stringify(user)}</pre>
                </>
        </UserRoute>
    )
};

export default UserIndex;