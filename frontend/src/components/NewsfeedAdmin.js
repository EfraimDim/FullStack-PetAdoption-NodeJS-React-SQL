import styles from '../styles/Newsfeed.module.css';
import { AppContext } from "../components/AppContext"
import { useContext } from "react"


function NewsfeedAdmin() {

  const { newsfeed } = useContext(AppContext);


  return (<div>
    <h1>Newsfeed:</h1>
    {newsfeed.map((update, index) => {  
                    return   (
                            <div key={index} className={styles.newsWrapper}>
                                <div className={styles.date}>{update.date_created.slice(0, 10)}</div>
                                <div className={styles.update}>{update.news}</div>
                            </div>
                            )})}
          </div>
  );
}

export default NewsfeedAdmin;