import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import styles from "../styles/HomePage.module.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import MyPetsPage from "./MyPetsPage";
import SearchPets from "./SearchPets";
import { Box, Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import ContactForm from "./ContactForm";
import RecentleyAdded from "./RecentleyAdded";

function HomePage() {
  const { loggedInInfo, signOut, toggleDrawer, sidebar, recentleyAddedPets } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const list = (anchor) => (
    <Box
      sx={{ background: "purple", height: "100vh", width: anchor === "top" || anchor === "bottom" ? "auto" : 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          <Link to="/">
            <div className={styles.sideBarButtons}>Home</div>
          </Link>,
          <Link to="/recentleyAdded">
            <div className={styles.sideBarButtons}>
              Recentley Added {recentleyAddedPets.length !== 0 && <span className={styles.recentleyAdded}>{recentleyAddedPets.length}</span>}
            </div>
          </Link>,
          <Link to="/petsPage">
            <div className={styles.sideBarButtons}>My Pets Page</div>
          </Link>,
          <Link to="/myProfile">
            <div className={styles.sideBarButtons}>Profile Settings</div>
          </Link>,
          <Link to="/searchPets">
            <div className={styles.sideBarButtons}>Search Pets</div>
          </Link>,
          <Link to="/contact">
            <div className={styles.sideBarButtons}>Contact</div>
          </Link>,
        ].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText sx={{ height: "100%", width: "100%" }} primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <nav className={styles.navBar}>
        <div>
          {["left"].map((anchor) => (
            <div key={anchor}>
              <Button sx={{ color: "white" }} onClick={toggleDrawer(anchor, true)}>
                Menu
              </Button>
              <Drawer anchor={anchor} open={sidebar[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </div>
          ))}
        </div>
        <div onClick={signOut} className={styles.signOut}>
          Sign Out
        </div>
      </nav>

      <div className={styles.routesWrapper}>
        <Routes>
          <Route path="/myProfile" element={<Profile />}></Route>
          <Route path="/petsPage" element={<MyPetsPage />}></Route>
          <Route path="/searchPets" element={<SearchPets />}></Route>
          <Route path="/contact" element={<ContactForm />}></Route>
          <Route path="/recentleyAdded" element={<RecentleyAdded />}></Route>
          <Route
            path="/"
            element={
              <h1 className={styles.header}>
                Welcome {loggedInInfo.first_name} {loggedInInfo.last_name} to your pet adoption account!
              </h1>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
export default HomePage;
