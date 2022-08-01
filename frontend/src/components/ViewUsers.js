import styles from "../styles/ViewUsers.module.css";
import { AppContext } from "../components/AppContext";
import DisplayUser from "./DisplayUser";
import { useContext } from "react";
import ViewUserPets from "./ViewUserPets";
import axios from "axios";
import swal from "sweetalert";

function ViewUsers() {
  const {
    allPublicUsersArray,
    setAllPublicUsersArray,
    allAdminUsersArray,
    setAllAdminUsersArray,
    viewedUserDetails,
    tokenFromLocalforage,
    adminInfo,
    setLoadSpinner,
  } = useContext(AppContext);

  const makeAdmin = async (user, adminEmail) => {
    try {
      swal({
        title: "Are you sure?",
        text: `Continuing will make ${user.email} an admin`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (makeAdmin) => {
        if (makeAdmin) {
          setLoadSpinner(true);
          const headers = await tokenFromLocalforage();
          await axios.put(
            `http://localhost:5000/users/makeAdmin`,
            {
              adminEmail: adminEmail,
              publicUserEmail: user.email,
              publicUserID: user.user_ID,
            },
            { headers: headers }
          );
          const newPublicUsersArray = allPublicUsersArray.filter((users) => users.user_ID !== user.user_ID);
          setAllPublicUsersArray(newPublicUsersArray);
          user.admin_status = 1;
          setAllAdminUsersArray([...allAdminUsersArray, user]);
          setLoadSpinner(false);
          swal(`${user.email} is now an admin!`, {
            icon: "success",
          });
        } else {
          swal(`${user.email} is still a public user`);
        }
      });
    } catch (e) {
      console.log(e);
      setLoadSpinner(false);
      swal({
        title: "Updated Admin Status Failed!",
        text: `Error: ${e}`,
        icon: "error",
        button: "return",
      });
    }
  };

  return (
    <>
      {viewedUserDetails ? (
        <ViewUserPets />
      ) : (
        <div>
          <h1 className={styles.header}>Admin Users</h1>
          <div className={styles.usersWrapper}>
            {allAdminUsersArray.map((user, index) => {
              return (
                <div className={styles.userHolder} key={index}>
                  <DisplayUser user={user} />
                </div>
              );
            })}
          </div>
          <h1 className={styles.header}>Public Users</h1>
          <div className={styles.usersWrapper}>
            {allPublicUsersArray.map((user, index) => {
              return (
                <div className={styles.userHolder} key={index}>
                  <DisplayUser user={user} />
                  <button className={styles.button} onClick={() => makeAdmin(user, adminInfo.email)}>
                    Make Admin
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ViewUsers;
