import { useContext } from "react"
import {AppContext} from "./AppContext"
import styles from "../styles/DisplayUser.module.css"
import axios from 'axios'






function DisplayUser({user}) {

    const { setViewedUserDetails, tokenFromLocalforage, setLoadSpinner } = useContext(AppContext);

    const viewUserPetsAndDetails = async(user) => {
    try{
        if(user.admin_status === 0){
        setLoadSpinner(true)
        const headers = await tokenFromLocalforage()
        const usersPets = await axios.get(`http://localhost:5000/users/viewedUsersPets?viewedUserID=${user.user_ID}`, {headers:headers})
        setViewedUserDetails({user:user, usersPets: usersPets.data})
        setLoadSpinner(false)
        }else{
        setViewedUserDetails({user:user})
        }
    }catch(e){
        console.log(e)
        setLoadSpinner(false) 
        }
    }
   
    return < >  
   <div  id={user.user_ID} className={styles.userInfo}>
        <div className={styles.info}> <span className={styles.field}>Email: </span>{user.email}</div>
        <div className={styles.info}><span className={styles.field}>First Name: </span>{user.first_name}</div>
        <div className={styles.info}><span className={styles.field}>Last Name: </span>{user.last_name}</div>
       <button className={styles.button} onClick={() => viewUserPetsAndDetails(user)}>More Info</button>
                </div>
</>
    }
    export default DisplayUser