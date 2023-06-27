import { useAppSelector } from "../redux/hook";
import { getUserData } from "../redux/userSlice";

const Admin = () => {
  const userData = useAppSelector(getUserData);
  console.log(userData.role);
  return <div>role: {userData.role}</div>;
};

export default Admin;
