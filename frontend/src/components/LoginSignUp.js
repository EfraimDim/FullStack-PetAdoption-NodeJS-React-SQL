import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import Modal from 'react-modal';
import styles from '../styles/LoginSignUp.module.css'
import axios from "axios"
import localforage from 'localforage'
import { TextField } from '@mui/material';

const customStyles = {
    content: {
    padding: 'none',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40vw',
      height: 'fit-content'
    },
  };
const inputStyles = {
     margin: "1px", transform: "scale(0.7)", width: "250px"
}
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

    const { modalIsOpen, setModalIsOpen, setLoadSpinner, setLoggedInInfo, setAdminInfo, setAdminLoggedIn, setAllPublicUsersArray, setAllAdminUsersArray, tokenFromLocalforage } = useContext(AppContext);


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
          setEmail('')
          setPassword('')
          setRePassword('')
          setFirstName('')
          setLastName('')
          setPhoneNumber('')
        }catch(e){
            console.log(e)
            setLoadSpinner(false) 
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
            }
    }
    const getAllPublicUsers = async() => {
    try{
        setLoadSpinner(true)
        const headers = await tokenFromLocalforage()
        const allPublicUsers = await axios.get('http://localhost:5000/users/allPublicUsers', {headers:headers})
        setAllPublicUsersArray(allPublicUsers.data)
        setLoadSpinner(false)
    }catch(e){
        console.log(e)
        setLoadSpinner(false) 
        }
      }
    
      const getAllAdminUsers = async() => {
        try{
        setLoadSpinner(true)
        const headers = await tokenFromLocalforage()
        const allAdminUsers = await axios.get('http://localhost:5000/users/allAdminUsers', {headers:headers})
        setAllAdminUsersArray(allAdminUsers.data)
        setLoadSpinner(false)
        }catch(e){
        console.log(e)
        setLoadSpinner(false) 
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
                await getAllPublicUsers()
                await getAllAdminUsers()
                setAdminInfo(loginUser.data.userInfo)
                setAdminLoggedIn(true)}
                else{
                setLoggedInInfo(loginUser.data.userInfo)
                }
            setLoadSpinner(false)
            setModalIsOpen(false)
            setPasswordLogin('')
            setEmailLogin('')
        }catch(e){
            console.log(e)
            setLoadSpinner(false) 
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
                        <TextField className={styles.input} required type="email" value={emailAdmin} maxLength={"50"} onChange={handleEmailAdmin} label="email address" />
                        <input className={styles.input} required type="password" value={passwordAdmin} minLength={"6"} maxLength={"20"} onChange={handlePasswordAdmin} placeholder="password" />
                        <input className={styles.input} required type="password" value={rePasswordAdmin} minLength={"6"} maxLength={"20"} onChange={handleRepasswordAdmin} placeholder="re password" />
                        <input className={styles.input} required type="text" value={firstNameAdmin} maxLength={"20"} onChange={handleFirstNameAdmin} placeholder="first name" />
                        <input className={styles.input} required type="text" value={lastNameAdmin} maxLength={"20"} onChange={handleLastNameAdmin} placeholder="last name" />
                        <input className={styles.input} required type="text" value={phoneNumberAdmin} minLength={"10"} maxLength={"10"} onChange={handlePhoneNumberAdmin} placeholder="phone number" />
                        <input className={styles.input} required type="password" value={adminCode} onChange={handleAdminCode} placeholder="admin code" />
                        <button className={styles.submit} type="submit">Sign Up</button>
                    </form> 
                </> 
                :
                <>
                    {isSignUp ? 
                    <>
                        <form onSubmit={signUp} className={styles.form}>
                            <input className={styles.input} required type="email" value={email} maxLength={"50"} onChange={handleEmail} placeholder="email address" />
                            <input className={styles.input} required type="password" value={password} minLength={"6"} maxLength={"20"} onChange={handlePassword} placeholder="password" />
                            <input className={styles.input} required type="password" value={rePassword} minLength={"6"} maxLength={"20"} onChange={handleRepassword} placeholder="re password" />
                            <input className={styles.input} required type="text" value={firstName} maxLength={"20"} onChange={handleFirstName} placeholder="first name" />
                            <input className={styles.input} required type="text" value={lastName} maxLength={"20"} onChange={handleLastName} placeholder="last name" />
                            <input className={styles.input} required type="text" value={phoneNumber} minLength={"10"} maxLength={"10"}  onChange={handlePhoneNumber} placeholder="phone number" />
                            <button className={styles.submit} type="submit">Sign Up</button>
                        </form> 
                    </>
                    :
                        <form onSubmit={login} className={styles.form}>
                            <TextField size="small"  required type="email" value={emailLogin} onChange={handleEmailLogin} inputProps={{ maxLength: 50 }} label="email address" sx={inputStyles} />
                            <TextField size="small" classes={styles.input} required type="password" value={passwordLogin} inputProps={{ minLength: 6, maxLength: 20 }} sx={inputStyles}  onChange={handlePasswordLogin} label="password" />
                            <button  className={styles.submit} type="submit">Login</button>
                        </form>
                    }
                </>}
                <button className={styles.close} onClick={(e)=>closeModal(e)}>close</button>
        </Modal>
    </div>)
    }
    export default ModalLoginSignUp