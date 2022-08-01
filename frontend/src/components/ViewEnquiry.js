import styles from "../styles/ViewEnquiry.module.css";
import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import { InputLabel } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function ViewEnquiry() {
  const { viewEnquiry, setViewEnquiry, adminInfo, tokenFromLocalforage, enquiryArray, setEnquiryArray } = useContext(AppContext);

  const returnToAllEnquiries = () => {
    setViewEnquiry(null);
  };

  const enquiryToInProgress = async (enquiryID, adminEmail, userEmail) => {
    try {
      const headers = await tokenFromLocalforage();
      await axios.put(
        `http://localhost:5000/users/enquiryToInProgress`,
        {
          enquiryID: enquiryID,
          adminEmail: adminEmail,
          userEmail: userEmail,
        },
        { headers: headers }
      );
      const newEnquiriesArray = [...enquiryArray];
      const enquiryToChange = newEnquiriesArray.find((enquiry) => enquiry.enquiry_ID === enquiryID);
      enquiryToChange.status = "in progress";
      enquiryToChange.admin_Email = adminEmail;
      setEnquiryArray(newEnquiriesArray);
      swal({
        title: "Enquiry Updated!",
        text: "You are now in charge of this enquiry",
        icon: "success",
        button: "return",
      });
    } catch (e) {
      console.log(e);
      swal({
        title: "Enquiry Update Failed!",
        text: `Error: ${e}`,
        icon: "error",
        button: "return",
      });
    }
  };

  const enquiryToResolved = async (enquiryID, adminEmail, userEmail) => {
    try {
      const headers = await tokenFromLocalforage();
      await axios.put(
        `http://localhost:5000/users/enquiryToResolved`,
        {
          enquiryID: enquiryID,
          adminEmail: adminEmail,
          userEmail: userEmail,
        },
        { headers: headers }
      );
      const newEnquiriesArray = [...enquiryArray];
      const enquiryToChange = newEnquiriesArray.find((enquiry) => enquiry.enquiry_ID === enquiryID);
      enquiryToChange.status = "resolved";
      enquiryToChange.admin_Email = adminEmail;
      setEnquiryArray(newEnquiriesArray);
      swal({
        title: "Enquiry Resolved!",
        icon: "success",
        button: "return",
      });
    } catch (e) {
      console.log(e);
      swal({
        title: "Enquiry Update Failed!",
        text: `Error: ${e}`,
        icon: "error",
        button: "return",
      });
    }
  };

  return (
    <div>
      <button onClick={returnToAllEnquiries} className={styles.button}>
        Return
      </button>
      <div className={styles.infoWrapper}>
        <span className={styles.label}>Date of Enquiry: </span>
        {viewEnquiry.date_created.slice(0, 10)}
      </div>
      <div className={styles.infoWrapper}>
        <span className={styles.label}>Email: </span>
        {viewEnquiry.user_Email}
      </div>
      <div className={styles.infoWrapper}>
        <span className={styles.label}>Full Name: </span>
        {viewEnquiry.first_name} {viewEnquiry.last_name}
      </div>
      <div className={styles.infoWrapper}>
        <span className={styles.label}>Phone Number: </span>
        {viewEnquiry.phone}
      </div>

      <div className={styles.infoWrapper}>
        <span className={styles.label}>Status: </span>
        <span
          className={
            (viewEnquiry.status === "resolved" && styles.green) ||
            (viewEnquiry.status === "unresolved" && styles.red) ||
            (viewEnquiry.status === "in progress" && styles.yellow)
          }
        >
          {viewEnquiry.status}
        </span>
      </div>

      {viewEnquiry.admin_Email && (
        <div>
          <span className={styles.label}>Admin Responding: </span>
          {viewEnquiry.admin_Email}
        </div>
      )}
      {!viewEnquiry.admin_Email && (
        <button onClick={() => enquiryToInProgress(viewEnquiry.enquiry_ID, adminInfo.email, viewEnquiry.user_Email)} className={styles.button}>
          In Progress
        </button>
      )}
      {(!viewEnquiry.admin_Email || viewEnquiry.status === "in progress") && (
        <button onClick={() => enquiryToResolved(viewEnquiry.enquiry_ID, adminInfo.email, viewEnquiry.user_Email)} className={styles.button}>
          Resolved
        </button>
      )}
      <InputLabel id="demo-simple-select-label" sx={{ marginTop: "20px", marginBottom: "10px" }}>
        Enquiry
      </InputLabel>
      <div className={styles.enquiry}>{viewEnquiry.enquiry}</div>
    </div>
  );
}

export default ViewEnquiry;
