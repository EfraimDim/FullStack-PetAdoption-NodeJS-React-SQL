import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/Profile.module.css'
import axios from "axios"
import localforage from 'localforage'


function Profile() {
    const { loggedInInfo, setLoggedInInfo, setLoadSpinner, tokenFromLocalforage } = useContext(AppContext);
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
        setLoadSpinner(true)
        const headers = await tokenFromLocalforage()
        const updateUserPassword = await axios.put("http://localhost:5000/users/updatePassword", {
            oldPassword: oldPassword,
            password: newPassword,
            rePassword: reNewPassword,
          }, {headers: headers})
        setLoadSpinner(false)
        alert(updateUserPassword.data) 
        setOldPassword('')
        setNewPassword('')
        setReNewPassword('')
    }catch(e){
        console.log(e)
        setLoadSpinner(false) 
        }
    }

    const updatedProfile = async(e) => {
    try{
        e.preventDefault()
        setLoadSpinner(true)
        const tokenString = await localforage.getItem('token');
        const token = JSON.parse(tokenString)
        const headers = {Authorization: `Bearer ${token}`}
        const updateUserProfile = await axios.put("http://localhost:5000/users/updateProfile", {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: JSON.stringify(phoneNumber),
            bio: bio
          }, {headers: headers})
          setLoggedInInfo({...loggedInInfo, email:email, first_name:firstName, last_name:lastName, phone:phoneNumber, bio:bio})
          setLoadSpinner(false)
          alert(updateUserProfile.data) 
    }catch(e){
        console.log(e)
        setLoadSpinner(false) 
            }
    }

    return <div className={styles.index}>
        <h1>Update Profile</h1>
         <form onSubmit={updatedProfile}>
        <input className={styles.input} required type="email" value={email} maxLength={"50"} onChange={handleEmail} placeholder="email address" />
        <input className={styles.input} required type="text" value={firstName} maxLength={"20"} onChange={handleFirstName} placeholder="first name" />
        <input className={styles.input} required type="text" value={lastName} maxLength={"20"} onChange={handleLastName} placeholder="last name" />
        <input className={styles.input} required type="text" value={phoneNumber} minLength={"10"} maxLength={"10"} onChange={handlePhoneNumber} placeholder="phone number" />
        <textarea className={styles.input} required type="text" value={bio} maxLength={"200"} onChange={handleBio} placeholder="Bio" />
        <button className={styles.submit} type="submit">Update Profile</button>
       </form>
       <h1>Update Password</h1>
       <form onSubmit={updatedPassword}>
        <input className={styles.input} required type="password" value={oldPassword} minLength={"6"} maxLength={"20"}  onChange={handleOldPassword} placeholder="old password" />
        <input className={styles.input} required type="password" value={newPassword} minLength={"6"} maxLength={"20"}  onChange={handleNewPassword} placeholder="new password" />
        <input className={styles.input} required type="password" value={reNewPassword} minLength={"6"} maxLength={"20"}  onChange={handleReNewpassword} placeholder="re new password" />
        <button className={styles.submit} type="submit">Update Password</button>
       </form>
      


</div>
    }
    export default Profile