import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import Modal from 'react-modal';
import styles from '../styles/LoginSignUp.module.css'
import axios from "axios"
import localforage from 'localforage'
import { TextField } from '@mui/material';
import { customStyles, inputStyles} from '../styles/MaterialUIStyles'
import swal from 'sweetalert'


  Modal.setAppElement('#root');

function ModalLoginSignUp() {

    const [isSignUp, setIsSignUp] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [emailAdmin, setEmailAdmin] = useState('');
    const [passwordAdmin, setPasswordAdmin] = useState('');
    const [rePasswordAdmin, setRePasswordAdmin] = useState('');
    const [firstNameAdmin, setFirstNameAdmin] = useState('');
    const [lastNameAdmin, setLastNameAdmin] = useState('');
    const [phoneNumberAdmin, setPhoneNumberAdmin] = useState('');
    const [adminCode, setAdminCode] = useState('')

    const { modalIsOpen, setModalIsOpen, setLoadSpinner, setLoggedInInfo, setAdminInfo, setAdminLoggedIn, setAllPublicUsersArray, setAllAdminUsersArray, tokenFromLocalforage, setNewsfeed, enquiryArray, setEnquiryArray } = useContext(AppContext);


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleRepassword = (e) => {
        setRePassword(e.target.value)
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
    const handleEmailAdmin = (e) => {
        setEmailAdmin(e.target.value)
    }
    const handlePasswordAdmin = (e) => {
        setPasswordAdmin(e.target.value)
    }
    const handleRepasswordAdmin = (e) => {
        setRePasswordAdmin(e.target.value)
    }
    const handleFirstNameAdmin = (e) => {
        setFirstNameAdmin(e.target.value)
    }
    const handleLastNameAdmin = (e) => {
        setLastNameAdmin(e.target.value)
    }
    const handlePhoneNumberAdmin = (e) => {
        setPhoneNumberAdmin(e.target.value)
    }
    const handleAdminCode = (e) => {
        setAdminCode(e.target.value)
    }
    const navSignUp = () => {
        setIsSignUp(true)
        setIsAdmin(false)
    }
    const navLogin = () => {
        setIsSignUp(false)
        setIsAdmin(false)
    }
    const navAdmin = () => {
        setIsAdmin(true)
    }
    const handleEmailLogin = (e) => {
        setEmailLogin(e.target.value)
    }
    const handlePasswordLogin = (e) => {
        setPasswordLogin(e.target.value)
    }

    const signUp = async(e) => {
        try{
        e.preventDefault();
        setLoadSpinner(true)
        const addUser = await axios.post("http://localhost:5000/users/signUp", {
            email: email,
            password: password,
            rePassword: rePassword,
            firstName: firstName,
            lastName: lastName,
            phoneNumber:  phoneNumber,
            admin: false
          })
          setLoadSpinner(false)
          swal({
            title: "Sign Up Success!",
            text: `Welcome ${firstName} ${lastName}`,
            icon: "success",
            button: "continue!",
          });
          setEmail('')
          setPassword('')
          setRePassword('')
          setFirstName('')
          setLastName('')
          setPhoneNumber('')
        }catch(e){
            console.log(e)
            setLoadSpinner(false)
            swal({
                title: "Sign Up Failed!",
                text: `${e}`,
                icon: "error",
                button: "okay",
              }); 
            }
    }
    const signUpAdmin = async(e) => {
        try{
        e.preventDefault();
        setLoadSpinner(true)
        const addUser = await axios.post("http://localhost:5000/users/signUp", {
            email: emailAdmin,
            password: passwordAdmin,
            rePassword: rePasswordAdmin,
            firstName: firstNameAdmin,
            lastName: lastNameAdmin,
            phoneNumber: phoneNumberAdmin,
            admin: true,
            adminCode: adminCode
          })
          setLoadSpinner(false)
          swal({
            title: "Sign Up Success!",
            text: `Welcome ${firstName} ${lastName}`,
            icon: "success",
            button: "continue!",
          });
          setEmailAdmin('')
          setPasswordAdmin('')
          setRePasswordAdmin('')
          setFirstNameAdmin('')
          setLastNameAdmin('')
          setPhoneNumberAdmin('')
          setAdminCode('')
        }catch(e){
            console.log(e)
            setLoadSpinner(false) 
            swal({
                title: "Sign Up Failed!",
                text: `${e}`,
                icon: "error",
                button: "okay",
              });
            }
    }

    
      const adminGetUsersAndNewsfeedArrays = async() => {
        try{
        const headers = await tokenFromLocalforage()
        const getArrays = await axios.get('http://localhost:5000/users/usersAndNewsfeedArraysForAdmin', {headers:headers})
        const adminUsers = getArrays.data.usersArray.filter(user => user.admin_status === 1)
        const publicUsers = getArrays.data.usersArray.filter(user => user.admin_status === 0)
        setAllPublicUsersArray(publicUsers)
        setAllAdminUsersArray(adminUsers)
        setNewsfeed(getArrays.data.newsfeedArray.reverse())
        setEnquiryArray(getArrays.data.enquiryArray)
        }catch(e){
        console.log(e)
        }
      }

    const login = async(e) => {
        try{
        e.preventDefault();
        setLoadSpinner(true)
        const loginUser = await axios.post("http://localhost:5000/users/login", {
            email: emailLogin,
            password: passwordLogin,
          })
            await localforage.setItem('token', JSON.stringify(loginUser.data.token));
            if(loginUser.data.userInfo.admin_status === 1){
                await adminGetUsersAndNewsfeedArrays()
                setAdminInfo(loginUser.data.userInfo)
                setAdminLoggedIn(true)}
                else{
                setLoggedInInfo(loginUser.data.userInfo)
                }
            setLoadSpinner(false)
            swal({
                title: "Log in Success!",
                icon: "success",
                button: "continue!",
              });
            setModalIsOpen(false)
            setPasswordLogin('')
            setEmailLogin('')
        }catch(e){
            console.log(e)
            setLoadSpinner(false)
            swal({
                title: "Login Failed!",
                text: `${e}`,
                icon: "error",
                button: "okay",
              });
            }
    }
    
        function closeModal(e) { 
            e.stopPropagation()
            setIsSignUp(true)
            setModalIsOpen(false);
        }

    return (
    <div>
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="SignUp/Login Modal">

                <nav className={styles.navBar}>
                    <div onClick={navSignUp} className={!isAdmin && isSignUp ? styles.white : styles.login }>Sign Up</div>
                    <div onClick={navLogin} className={!isAdmin && !isSignUp ? styles.white : styles.login }>Login</div>
                    <div onClick={navAdmin} className={isAdmin ? styles.white : styles.login }>Admin</div>
                </nav>
                {isAdmin  ? 
                <> 
                    <form onSubmit={signUpAdmin} className={styles.form}>
                        <TextField size="small" required type="email" value={emailAdmin} onChange={handleEmailAdmin} inputProps={{ maxLength: 50 }} sx={inputStyles} label="email address" />
                        <TextField size="small" required type="password" value={passwordAdmin} onChange={handlePasswordAdmin} inputProps={{ minLength: 6, maxLength: 20 }} sx={inputStyles} label="password" />
                        <TextField size="small" required type="password" value={rePasswordAdmin}  onChange={handleRepasswordAdmin} inputProps={{ minLength: 6, maxLength: 20 }} sx={inputStyles} label="re password" />
                        <TextField size="small" required type="text" value={firstNameAdmin} onChange={handleFirstNameAdmin} inputProps={{ maxLength: 20 }} sx={inputStyles} label="first name" />
                        <TextField size="small" required type="text" value={lastNameAdmin}  onChange={handleLastNameAdmin} inputProps={{ maxLength: 20 }} sx={inputStyles} label="last name" />
                        <TextField size="small" required type="text" value={phoneNumberAdmin} onChange={handlePhoneNumberAdmin} inputProps={{ minLength: 10, maxLength: 10 }} sx={inputStyles} label="phone number" />
                        <TextField size="small" required type="password" value={adminCode} onChange={handleAdminCode} sx={inputStyles} label="admin code" />
                        <button className={styles.submit} type="submit">Sign Up</button>
                    </form> 
                </> 
                :
                <>
                    {isSignUp ? 
                    <>
                        <form onSubmit={signUp} className={styles.form}>
                            <TextField size="small"  required type="email" value={email}  onChange={handleEmail} inputProps={{ maxLength: 50 }} sx={inputStyles} label="email address" />
                            <TextField size="small"  required type="password" value={password}  maxLength={"20"} onChange={handlePassword} inputProps={{ minLength: 6, maxLength: 20 }} sx={inputStyles} label="password" />
                            <TextField size="small"  required type="password" value={rePassword}  onChange={handleRepassword} inputProps={{ minLength: 6, maxLength: 20 }} sx={inputStyles} label="re password" />
                            <TextField size="small"  required type="text" value={firstName}  onChange={handleFirstName} inputProps={{maxLength: 20 }} sx={inputStyles} label="first name" />
                            <TextField size="small"  required type="text" value={lastName}  onChange={handleLastName} inputProps={{ maxLength: 20 }} sx={inputStyles} label="last name" />
                            <TextField size="small"  required type="text" value={phoneNumber}   onChange={handlePhoneNumber} inputProps={{ minLength: 10, maxLength: 10 }} sx={inputStyles} label="phone number" />
                            <button className={styles.submit} type="submit">Sign Up</button>
                        </form> 
                    </>
                    :
                        <form onSubmit={login} className={styles.form}>
                            <TextField size="small"  required type="email" value={emailLogin} onChange={handleEmailLogin} inputProps={{ maxLength: 50 }}  sx={inputStyles} label="email address"/>
                            <TextField size="small"  required type="password" value={passwordLogin} onChange={handlePasswordLogin} inputProps={{ minLength: 6, maxLength: 20 }} sx={inputStyles}   label="password" />
                            <button  className={styles.submit} type="submit">Login</button>
                        </form>
                    }
                </>}
                <button className={styles.close} onClick={(e)=>closeModal(e)}>close</button>
        </Modal>
    </div>)
    }
    export default ModalLoginSignUp