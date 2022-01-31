import { useContext } from "react";
import { Context } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <AdminRoute>
      <h1>Admin dashboard</h1>
    </AdminRoute>
  );
};

export default UserIndex;
