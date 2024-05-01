import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';
import Storage from '../utils/storage';

function LogOutButton() {
  const {logout} = useAuth();
  return (
    <IconButton color="inherit" onClick={()=>{
      Storage.removeValue("AUTH")
      logout();
    }}>
      <LogoutIcon />
    </IconButton>
  );
}

export default LogOutButton;
