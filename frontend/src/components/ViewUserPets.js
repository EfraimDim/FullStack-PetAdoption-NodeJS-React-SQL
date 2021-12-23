import styles from '../styles/ViewUsersPets.module.css';
import { AppContext } from "../components/AppContext"
import DisplayPet from "./DisplayPet"
import { useNavigate } from "react-router-dom";
import {useContext} from "react"


function ViewUserPets() {

  

  const { viewedUserDetails, setViewedUserDetails } = useContext(AppContext);

  const navigate = useNavigate();


  const returnToAllUsers = () =>{
    setViewedUserDetails(null)
    navigate('/viewUsers')
  }


  return (<div>
      <button className={styles.button} onClick={returnToAllUsers}>Return</button>
      <h2 className={styles.header}>Users Details:</h2>
      <div className={styles.wrapper}>
      <div className={styles.info}><span className={styles.field}>Email: </span>{viewedUserDetails.user.email}</div>
      <div className={styles.info}><span className={styles.field}>First Name: </span>{viewedUserDetails.user.first_name}</div>
      <div className={styles.info}><span className={styles.field}>Last Name: </span>{viewedUserDetails.user.last_name}</div>
      <div className={styles.info}><span className={styles.field}>Phone: </span>{viewedUserDetails.user.phone}</div>
      <div className={styles.info}><span className={styles.field}>Bio: </span>{viewedUserDetails.user.bio}</div>
      <div className={styles.info}><span className={styles.field}>Date Created: </span>{viewedUserDetails.user.date_created.slice(0, 10)}</div>
      </div>
      
      {viewedUserDetails.usersPets && <div className={styles.petArrayWrapper}>
      <h2 className={styles.header}>Users Pets:</h2>
      {viewedUserDetails.usersPets && viewedUserDetails.usersPets.length === 0 && <div className={styles.noPets}>User has no pets</div>}
      {viewedUserDetails.usersPets && viewedUserDetails.usersPets.map((pet, index) => {  
                    return   (
                            <div className={styles.petHolder} key={index}>
                            <DisplayPet  pet= {pet} index={index}/>
                            </div>
                            )})}
    </div>}
   

</div>
  );
}

export default ViewUserPets;