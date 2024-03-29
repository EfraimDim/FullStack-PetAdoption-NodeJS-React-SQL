import styles from "./styles/App.module.css";
import { AppContext } from "./components/AppContext";
import { useState, useEffect, useRef } from "react";
import LoginSignUp from "./components/LoginSignUp";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import axios from "axios";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";
import { Box, Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import SearchPets from "./components/SearchPets";
import { LoadingButton } from "@mui/lab";
import swal from "sweetalert";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedInInfo, setLoggedInInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [allPetsArray, setAllPetsArray] = useState([]);
  const [savedPetsArray, setSavedPetsArray] = useState([]);
  const [myPetsArray, setMyPetsArray] = useState([]);
  const [petImages, setPetImages] = useState([]);
  const [allPublicUsersArray, setAllPublicUsersArray] = useState([]);
  const [allAdminUsersArray, setAllAdminUsersArray] = useState([]);
  const [enquiryArray, setEnquiryArray] = useState([]);
  const [viewedUserDetails, setViewedUserDetails] = useState(null);
  const [petDetailsToEdit, setPetDetailsToEdit] = useState(null);
  const [searchBeforeLogin, setSearchBeforeLogin] = useState(false);
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [newsfeed, setNewsfeed] = useState([]);
  const [viewEnquiry, setViewEnquiry] = useState(null);
  const [paginationCount, setPaginationCount] = useState(1);
  const [paginationNewsfeedArray, setPaginationNewsfeedArray] = useState([]);
  const [recentleyAddedPets, setRecentleyAddedPets] = useState([]);
  const [sidebar, setSidebar] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function importAllImages(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  useEffect(() => {
    try {
      setLoadSpinner(true);
      const images = importAllImages(require.context("./images", false, /\.(png|jpe?g|svg)$/));
      setPetImages(images);
      setLoadSpinner(false);
    } catch (e) {
      console.log(e);
      setLoadSpinner(false);
    }
  }, []);

  const getAllPets = async () => {
    try {
      setLoadSpinner(true);
      const allPets = await axios.get("http://localhost:5000/pets/allPets");
      setAllPetsArray(allPets.data);
      setLoadSpinner(false);
    } catch (e) {
      console.log(e);
      setLoadSpinner(false);
    }
  };

  useEffect(() => {
    getAllPets();
  }, []);

  const tokenFromLocalforage = async () => {
    try {
      const tokenString = await localforage.getItem("token");
      if (tokenString) {
        const token = JSON.parse(tokenString);
        const headers = { Authorization: `Bearer ${token}` };
        return headers;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getUsersPetsArrays = async () => {
    try {
      setLoadSpinner(true);
      const headers = await tokenFromLocalforage();
      if (headers) {
        const usersPetArrays = await axios.get("http://localhost:5000/pets/usersPetArrays", { headers: headers });
        setSavedPetsArray(usersPetArrays.data.savedPetsArray);
        setMyPetsArray(usersPetArrays.data.adoptedPetsArray);
      }
      setLoadSpinner(false);
    } catch (e) {
      console.log(e);
      setLoadSpinner(false);
    }
  };
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getUsersPetsArrays();
  }, [loggedInInfo]);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  const signOut = async () => {
    try {
      if (loggedInInfo) {
        const allPetArrayIDs = allPetsArray.map((pets) => pets.pet_ID);
        const allPetArrayIDsString = JSON.stringify(allPetArrayIDs);
        const headers = await tokenFromLocalforage();
        const petIDsToDatabase = await axios.put(
          "http://localhost:5000/users/lastSeenPets",
          {
            allPetArrayIDsString: allPetArrayIDsString,
          },
          { headers: headers }
        );
      }
      setLoggedInInfo(null);
      setAdminInfo(null);
      localforage.setItem("token", "");
      swal({
        title: "Log Out Success!",
        icon: "success",
        button: "continue!",
      });
      navigate("/");
    } catch (e) {
      console.log(e);
      setLoadSpinner(false);
      swal({
        title: "Log Out Failed!",
        text: `Error: ${e}`,
        icon: "error",
        button: "return",
      });
    }
  };

  function openModal() {
    setModalIsOpen(true);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setSidebar({ ...sidebar, [anchor]: open });
  };

  const navHome = () => {
    setSearchBeforeLogin(false);
  };
  const navSearchBeforeLogin = () => {
    setSearchBeforeLogin(true);
  };
  const list = (anchor) => (
    <Box
      sx={{ background: "purple", height: "100vh", width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        sx={{
          background: "purple",
        }}
      >
        {[
          <div className={styles.sideBarButtons} onClick={() => navHome()}>
            Home
          </div>,
          <div className={styles.sideBarButtons} onClick={() => navSearchBeforeLogin()}>
            Search Pets
          </div>,
        ].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText sx={{ height: "100%", width: "100%" }} primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppContext.Provider
      value={{
        modalIsOpen,
        setModalIsOpen,
        loggedInInfo,
        setLoggedInInfo,
        myPetsArray,
        setMyPetsArray,
        savedPetsArray,
        setSavedPetsArray,
        allPetsArray,
        setAllPetsArray,
        tokenFromLocalforage,
        setAdminInfo,
        adminInfo,
        signOut,
        petImages,
        setAllPublicUsersArray,
        setAllAdminUsersArray,
        allAdminUsersArray,
        allPublicUsersArray,
        viewedUserDetails,
        setViewedUserDetails,
        petDetailsToEdit,
        setPetDetailsToEdit,
        setPetImages,
        importAllImages,
        toggleDrawer,
        sidebar,
        loadSpinner,
        setLoadSpinner,
        newsfeed,
        setNewsfeed,
        enquiryArray,
        setEnquiryArray,
        viewEnquiry,
        setViewEnquiry,
        paginationCount,
        setPaginationCount,
        paginationNewsfeedArray,
        setPaginationNewsfeedArray,
        recentleyAddedPets,
        setRecentleyAddedPets,
      }}
    >
      <div>
        {loadSpinner ? (
          <div className={styles.loadingButton}>
            <LoadingButton loading={loadSpinner} sx={{ transform: "scale(3)" }} />
          </div>
        ) : (
          <>
            {adminInfo ? (
              <AdminPage />
            ) : (
              <>
                {loggedInInfo ? (
                  <HomePage />
                ) : (
                  <>
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
                      <div onClick={openModal} className={styles.login}>
                        Login
                      </div>
                    </nav>

                    {searchBeforeLogin ? (
                      <SearchPets />
                    ) : (
                      <div className={styles.wrapper}>
                        <h1 className={styles.header}>Welcome to the pet adoption agency!</h1>
                        <p>Go ahead and sign up to adopt your first pet today!</p>
                        <p>Or go ahead and use our search to find your perfect match first</p>
                      </div>
                    )}

                    <LoginSignUp />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
