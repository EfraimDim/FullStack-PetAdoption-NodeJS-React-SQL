import styles from "../styles/ContactForm.module.css";
import { AppContext } from "../components/AppContext";
import { useContext, useState } from "react";
import { TextField, InputLabel } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function ContactForm() {
  const { loggedInInfo, tokenFromLocalforage } = useContext(AppContext);

  const [email, setEmail] = useState(loggedInInfo.email);
  const [firstName, setFirstName] = useState(loggedInInfo.first_name);
  const [lastName, setLastName] = useState(loggedInInfo.last_name);
  const [phoneNumber, setPhoneNumber] = useState(loggedInInfo.phone);
  const [enquiry, setEnquiry] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleEnquiry = (e) => {
    setEnquiry(e.target.value);
  };
  const sendEnquiry = async (e) => {
    e.preventDefault();
    try {
      const headers = await tokenFromLocalforage();
      await axios.post(
        "http://localhost:5000/users/sendEnquiry",
        {
          enquiry: enquiry,
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phoneNumber,
        },
        { headers: headers }
      );
      setEnquiry("");
      swal({
        title: "Enquiry Sent!",
        text: `${firstName} ${lastName} we hope to get back to you in the next 48 hours`,
        icon: "success",
        button: "continue!",
      });
    } catch (e) {
      console.log(e);
      swal({
        title: "Enquiry Send Failure!",
        text: `${e}`,
        icon: "error",
        button: "okay",
      });
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Contact Us:</h1>
      <form className={styles.form} onSubmit={sendEnquiry}>
        <TextField
          size="small"
          required
          type="email"
          value={email}
          onChange={handleEmail}
          inputProps={{ maxLength: 50 }}
          sx={{ margin: "10px", width: "20vw" }}
          label="email address"
        />
        <TextField
          size="small"
          required
          type="text"
          value={firstName}
          inputProps={{ maxLength: 20 }}
          onChange={handleFirstName}
          sx={{ margin: "10px", width: "20vw" }}
          label="first name"
        />
        <TextField
          size="small"
          required
          type="text"
          value={lastName}
          inputProps={{ maxLength: 20 }}
          onChange={handleLastName}
          sx={{ margin: "10px", width: "20vw" }}
          label="last name"
        />
        <TextField
          size="small"
          required
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={phoneNumber}
          inputProps={{ minLength: 12, maxLength: 12 }}
          onChange={handlePhoneNumber}
          sx={{ margin: "10px", width: "20vw" }}
          label="phone number"
        />
        <InputLabel id="demo-simple-select-label">Enquiry:</InputLabel>
        <TextField
          required
          multiline={true}
          type="text"
          value={enquiry}
          inputProps={{ maxLength: 300 }}
          onChange={handleEnquiry}
          sx={{ width: "50vw", marginTop: "20px" }}
        />
        <button className={styles.submit} type="submit">
          Send!
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
