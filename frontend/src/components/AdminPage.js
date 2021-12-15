import styles from '../styles/AdminPage.module.css';
import { AppContext } from "../components/AppContext"
import {useState, useEffect, useContext} from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AddPet from './AddPet'
import EditPet from './EditPet'
import ViewUsers from './ViewUsers'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import NewsfeedAdmin from './NewsfeedAdmin'

function AdminPage() {

  const {  signOut, toggleDrawer, sidebar } = useContext(AppContext);
  const location = useLocation()

  useEffect(()=>{
    location.pathname = "/"
  },[])

  const list = (anchor) => (
    <Box
      sx={{ background: 'rgb(44, 44, 198)', height: '100vh', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[<Link to="/"><div className={styles.sideBarButtons}>Newsfeed</div></Link>,
        <Link to="/editPets"><div className={styles.sideBarButtons}>Edit Pets</div></Link>, 
        <Link to="/addPets"><div className={styles.sideBarButtons}>Add Pet</div></Link>,  
        <Link to="/viewUsers"><div  className={styles.sideBarButtons}>Users</div></Link> ].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText sx={{ height: '100%', width: '100%'}} primary={text} />
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
          <Button sx={{color: 'white'}} onClick={toggleDrawer(anchor, true)}>Menu</Button>
          <Drawer
            anchor={anchor}
            open={sidebar[anchor]}
            onClose={toggleDrawer(anchor, false)}
           
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </div>
      <div onClick={signOut} className={styles.signOut}>Sign Out</div>
      </nav>

     <div className={styles.routesWrapper}>
      <Routes>
    <Route path="/" element={<NewsfeedAdmin/>}></Route>
    <Route path="/viewUsers" element={<ViewUsers/>}></Route>
    <Route path='/addPets' element={<AddPet/>}></Route>
    <Route path="/editPets" element={<EditPet/>}></Route>
    </Routes>
    </div>
    

    </div>

  );
}

export default AdminPage;
