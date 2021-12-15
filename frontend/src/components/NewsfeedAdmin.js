import styles from '../styles/Newsfeed.module.css';
import { AppContext } from "../components/AppContext"
import { useContext } from "react"


function NewsfeedAdmin() {

  const { newsfeed } = useContext(AppContext);


  return (<div>
    <h1>Newsfeed:</h1>
    {newsfeed.map((update, index) => {  
                    return   (
                            <div className={styles.update} key={update.id}>
                              {update.news}
                            </div>
                            )})}
          </div>
  );
}

export default NewsfeedAdmin;