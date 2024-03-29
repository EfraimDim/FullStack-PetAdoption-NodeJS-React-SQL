import styles from "../styles/RecentleyAdded.module.css";
import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import DisplayPet from "./DisplayPet";

function RecentleyAdded() {
  const { recentleyAddedPets } = useContext(AppContext);

  return (
    <div>
      <h1 className={styles.header}>Recentley Added Pets:</h1>
      {recentleyAddedPets.length !== 0 ? (
        recentleyAddedPets.map((pet, index) => {
          return (
            <div className={styles.petHolder} key={index}>
              <DisplayPet pet={pet} index={index} allPets={true} />
            </div>
          );
        })
      ) : (
        <div>No Recentley Added Pets!</div>
      )}
    </div>
  );
}

export default RecentleyAdded;
