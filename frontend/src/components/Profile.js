import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/Profile.module.css'
import axios from "axios"
import { TextField, InputLabel } from '@mui/material';
import { inputStyles} from '../styles/MaterialUIStyles'
import swal from 'sweetalert'

function Profile() {
    const { loggedInInfo, setLoggedInInfo, tokenFromLocalforage } = useContext(AppContext);
    const [email, setEmail] = useState(loggedInInfo.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [firstName, setFirstName] = useState(loggedInInfo.first_name);
    const [lastName, setLastName] = useState(loggedInInfo.last_name);
    const [phoneNumber, setPhoneNumber] = useState(loggedInInfo.phone);
    const [bio, setBio] = useState(loggedInInfo.bio);

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleOldPassword = (e) => {
        setOldPassword(e.target.value)
    }
    const handleNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const handleReNewpassword = (e) => {
        setReNewPassword(e.target.value)
    }
    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }
    const handleBio = (e) => {
        setBio(e.target.value)
    }

    const updatedPassword = async(e) => {
    try{
        e.preventDefault()
        swal({
            title: "Are you sure?",
            text: "Dont forget new password after updated!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willUpdate) => {
            if (willUpdate) {
                const headers = await tokenFromLocalforage()
                const updateUserPassword = await axios.put("http://localhost:5000/users/updatePassword", {
                    oldPassword: oldPassword,
                    password: newPassword,
                    rePassword: reNewPassword,
                  }, {headers: headers})
                setOldPassword('')
                setNewPassword('')
                setReNewPassword('')
              swal("Password Updated!", {
                icon: "success",
              });
            } else {
              swal("Your password hasn't been changed!");
            }
          });
    }catch(e){
        swal({
            title: "Updated Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          });
          console.log(e)
        }
    }

    const updatedProfile = async(e) => {
    try{
        e.preventDefault()
        swal({
            title: "Are you sure?",
            text: "Update profile to new details",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willUpdate) => {
            if (willUpdate) {
                const headers = await tokenFromLocalforage()
                const updateUserProfile = await axios.put("http://localhost:5000/users/updateProfile", {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    bio: bio
                  }, {headers: headers})
                  setLoggedInInfo({...loggedInInfo, email:email, first_name:firstName, last_name:lastName, phone:phoneNumber, bio:bio})
              swal("Profile details Updated!", {
                icon: "success",
              });
            } else {
              swal("Profile details unchanged!");
            }
          });
    }catch(e){
        console.log(e)
        swal({
            title: "Updated Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          });
            }
    }

    return <div>
        <h1 className={styles.header} >Update Profile:</h1>
         <form className={styles.form} onSubmit={updatedProfile}>
        <TextField size="small" required type="email" value={email}  onChange={handleEmail} inputProps={{ maxLength: 50 }} sx={inputStyles} label="email address" />
        <TextField size="small" required type="text" value={firstName} inputProps={{ maxLength: 20 }} onChange={handleFirstName} sx={inputStyles} label="first name" />
        <TextField size="small" required type="text" value={lastName}  inputProps={{ maxLength: 20 }} onChange={handleLastName} sx={inputStyles} label="last name" />
        <TextField size="small" required type="tel" value={phoneNumber} inputProps={{ minLength: 12, maxLength: 12 }} onChange={handlePhoneNumber} sx={inputStyles} label="phone number" />
        <InputLabel sx={{fontSize: "12px", height:"fit-content", width:"250px", textAlign: "center"}} id="demo-simple-select-label">*[0-9](3)-[0-9](3)-[0-9](4)</InputLabel>
        <TextField size="small" multiline={true} required type="text" value={bio} inputProps={{maxLength: 200 }} onChange={handleBio} sx={inputStyles} label="bio" />
        <button className={styles.submit} type="submit">Update Profile</button>
       </form>
       <h1 className={styles.header} >Update Password:</h1>
       <form className={styles.form} onSubmit={updatedPassword}>
        <TextField size="small" required type="password" value={oldPassword} inputProps={{ minLength: 8, maxLength: 20 }}  onChange={handleOldPassword} sx={inputStyles} label="old password" />
        <InputLabel sx={{fontSize: "8px", height:"fit-content", width:"250px", textAlign: "center"}} id="demo-simple-select-label">*requires one capital letter, number, special char</InputLabel>
        <TextField size="small" required type="password" value={newPassword} inputProps={{ minLength: 8, maxLength: 20 }}  onChange={handleNewPassword} sx={inputStyles} label="new password" />
        <TextField size="small" required type="password" value={reNewPassword} inputProps={{ minLength: 8, maxLength: 20 }} onChange={handleReNewpassword} sx={inputStyles} label="re new password" />
        <button className={styles.submit} type="submit">Update Password</button>
       </form>
      


</div>
    }
    export default Profile