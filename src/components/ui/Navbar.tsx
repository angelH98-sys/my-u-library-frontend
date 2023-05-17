import { useState, KeyboardEvent, MouseEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Collapse,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutFromFirebase } from "../../redux/thunk/user/user.thunk";

const appName = import.meta.env.VITE_APP_NAME;
export const Navbar = () => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState({
    drawer: false,
    user: false,
  });
  const { status: userAuth } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const changeToggle =
    (toggleKey: any, isOpen: boolean) =>
    (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setToggle({ ...toggle, [toggleKey]: isOpen });
    };

  useEffect(() => {
    if (!toggle["drawer"]) {
      Object.keys(toggle).forEach((key) => {
        key !== "drawer" && setToggle({ ...toggle, [key]: false });
      });
    }
  }, [toggle["drawer"]]);

  useEffect(() => {
    setToggle({ ...toggle, drawer: false });
  }, [location]);

  useEffect(() => {
    if (userAuth == "not-authenticated") {
      navigate("/auth/signin");
    }
  }, [userAuth]);

  const logout = async () => {
    await dispatch(logoutFromFirebase());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={changeToggle("drawer", !toggle["drawer"])}
          >
            {toggle["drawer"] ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={toggle["drawer"]}
        onClose={changeToggle("drawer", false)}
      >
        <Toolbar />
        <Box sx={{ width: "auto" }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={changeToggle("user", !toggle["user"])}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={t("ui.navbar.account.button")} />
                {toggle["user"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={toggle["user"]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    display: userAuth === "authenticated" ? "none" : "",
                  }}
                  onClick={(event) => navigate("/auth/signin")}
                >
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("ui.navbar.account.signin.button")}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    pl: 4,
                    display: userAuth === "authenticated" ? "" : "none",
                  }}
                  onClick={logout}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("ui.navbar.account.signout.button")}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
