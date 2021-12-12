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
        <div>{user.email}</div>
        <div>{user.first_name}</div>
        <div>{user.last_name}</div>
       <button onClick={() => viewUserPetsAndDetails(user)}>View More</button>
                </div>
</>
    }
    export default DisplayUser