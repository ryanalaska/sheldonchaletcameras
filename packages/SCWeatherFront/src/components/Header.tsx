import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import LogOutButton from "./LogOutButton";
import logo from "../assets/logo.png";

const Header = () => {
  const { palette } = useTheme();
  const { user = null } = useAuth();
  return (
    <AppBar position="static" style={{ background: palette.primary.main }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          <img src={logo} height={40} />
        </Typography>
        <Stack sx={{ textAlign: "right", marginRight: 3 }}>
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ display: "inline", fontWeight: "bold", lineHeight: 1.2 }}
          >
            {user?.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "inline", color: "#f2f2f2" }}
          >
            {user?.email}
          </Typography>
        </Stack>
        <LogOutButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
