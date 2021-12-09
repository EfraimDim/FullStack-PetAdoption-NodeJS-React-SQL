import { useContext } from "react"
import {AppContext} from "./AppContext"
import styles from "../styles/DisplayUser.module.css"
import axios from 'axios'






function DisplayUser({user}) {

    const { setViewedUserDetails, tokenFromLocalforage } = useContext(AppContext);

    const viewUserPetsAndDetails = async(user) => {
        if(user.admin_status === 0){
        const headers = await tokenFromLocalforage()
        const usersPets = await axios.get(`/users/viewedUsersPets?viewedUserID=${user.user_ID}`, {headers:headers})
        setViewedUserDetails({user:user, usersPets: usersPets.data})
        }else{
            setViewedUserDetails({user:user})
        }
        
    }
    
    return < >  
   <div  id={user.user_ID} className={styles.userInfo}>
        <div>{user.email}</div>
        <div>{user.first_name}</div>
        <div>{user.last_name}</div>
       <div onClick={() => viewUserPetsAndDetails(user)}>View More</div>
                </div>
</>
    }
    export default DisplayUser