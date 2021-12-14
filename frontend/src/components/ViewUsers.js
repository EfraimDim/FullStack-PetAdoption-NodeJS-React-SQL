import styles from '../styles/ViewUsers.module.css';
import { AppContext } from "../components/AppContext"
import DisplayUser from './DisplayUser'
import { useContext } from "react"
import ViewUserPets from './ViewUserPets'


function ViewUsers() {

  const { allPublicUsersArray, allAdminUsersArray, viewedUserDetails } = useContext(AppContext);


  return (<>
    {viewedUserDetails ? <ViewUserPets />  :<div>
          <h1>Admin Users</h1>
          <div className={styles.usersWrapper}>
          {allAdminUsersArray.map((user, index) => {  
                    return   (
                            <div className={styles.userHolder} key={index}>
                            <DisplayUser  user= {user}/>
                            </div>
                            )})}
            </div>
          <h1>Public Users</h1>
          <div className={styles.usersWrapper}>
          {allPublicUsersArray.map((user, index) => {  
                    return   (
                            <div className={styles.userHolder} key={index}>
                            <DisplayUser  user= {user}/>
                            </div>
                            )})}
            </div>
    </div>}


</>
  );
}

export default ViewUsers;