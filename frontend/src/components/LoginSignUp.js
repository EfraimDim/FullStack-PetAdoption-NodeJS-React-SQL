import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import Modal from 'react-modal';
import styles from '../styles/LoginSignUp.module.css'
import axios from "axios"
import localforage from 'localforage'

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

    const { modalIsOpen, setModalIsOpen, setLoggedInInfo } = useContext(AppContext);


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
        e.preventDefault();
        const addUser = await axios.post("/users/signUp", {
            email: email,
            password: password,
            rePassword: rePassword,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            admin: false
          })
          if(addUser.data === "Register Succesful!"){
          alert(addUser.data)
          setEmail('')
          setPassword('')
          setRePassword('')
          setFirstName('')
          setLastName('')
          setPhoneNumber('')
        }
          else{
              alert("Something went wrong, please try again")
          }

    }
    const signUpAdmin = async(e) => {
        e.preventDefault();
        const addUser = await axios.post("/users/signUp", {
            email: emailAdmin,
            password: passwordAdmin,
            rePassword: rePasswordAdmin,
            firstName: firstNameAdmin,
            lastName: lastNameAdmin,
            phoneNumber: phoneNumberAdmin,
            admin: true,
            adminCode: adminCode
          })
          if(addUser.data === "Register Succesful!"){
          alert(addUser.data)
          setEmailAdmin('')
          setPasswordAdmin('')
          setRePasswordAdmin('')
          setFirstNameAdmin('')
          setLastNameAdmin('')
          setPhoneNumberAdmin('')
        }
          else{
              alert("Something went wrong, please try again")
          }

    }
    const login = async(e) => {
        e.preventDefault();
        const loginUser = await axios.post("/users/login", {
            email: emailLogin,
            password: passwordLogin,
         
          })
        if(loginUser.data.message === "Login Success!"){
            const tokenSet = await localforage.setItem('token', JSON.stringify(loginUser.data.token));
            alert(loginUser.data.message)
            setModalIsOpen(false)
            setLoggedInInfo(loginUser.data.userInfo)
            setPasswordLogin('')
            setEmailLogin('')
        }
       else{
           alert("Oops something went wrong, please try again!")
       }

    }

 

  function closeModal(e) { 
    e.stopPropagation()
    setIsSignUp(true)
    setModalIsOpen(false);
  }

    return <div >
          <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="SignUp/Login Modal"
      >
        <nav className={styles.navBar}>
            <div onClick={navSignUp} className={styles.signUp}>Sign Up</div>
            <div onClick={navLogin} className={styles.login}>Login</div>
            <div onClick={navAdmin} className={styles.login}>Admin</div>
        </nav>
        {isAdmin  ? <>
        <h2 className={styles.header}>Admin</h2> 
        <form onSubmit={signUpAdmin} className={styles.form}>
        <input className={styles.input} required type="email" value={emailAdmin} onChange={handleEmailAdmin} placeholder="email address" />
        <input className={styles.input} required type="password" value={passwordAdmin} onChange={handlePasswordAdmin} placeholder="password" />
        <input className={styles.input} required type="password" value={rePasswordAdmin} onChange={handleRepasswordAdmin} placeholder="re password" />
        <input className={styles.input} required type="text" value={firstNameAdmin} onChange={handleFirstNameAdmin} placeholder="first name" />
        <input className={styles.input} required type="text" value={lastNameAdmin} onChange={handleLastNameAdmin} placeholder="last name" />
        <input className={styles.input} required type="tel" value={phoneNumberAdmin} onChange={handlePhoneNumberAdmin} placeholder="phone number" />
        <input className={styles.input} required type="password" value={adminCode} onChange={handleAdminCode} placeholder="admin code" />
        <button className={styles.submit} type="submit">Sign Up</button>
       </form> </> :<>
        {isSignUp ? <>
        <h2 className={styles.header}>SignUp</h2> 
        <form onSubmit={signUp} className={styles.form}>
        <input className={styles.input} required type="email" value={email} onChange={handleEmail} placeholder="email address" />
        <input className={styles.input} required type="password" value={password} onChange={handlePassword} placeholder="password" />
        <input className={styles.input} required type="password" value={rePassword} onChange={handleRepassword} placeholder="re password" />
        <input className={styles.input} required type="text" value={firstName} onChange={handleFirstName} placeholder="first name" />
        <input className={styles.input} required type="text" value={lastName} onChange={handleLastName} placeholder="last name" />
        <input className={styles.input} required type="tel" value={phoneNumber} onChange={handlePhoneNumber} placeholder="phone number" />
        <button className={styles.submit} type="submit">Sign Up</button>
       </form> </>:
             <form onSubmit={login} className={styles.form}>
             <input className={styles.input} required type="email" value={emailLogin} onChange={handleEmailLogin} placeholder="email address" />
             <input className={styles.input} required type="password" value={passwordLogin} onChange={handlePasswordLogin} placeholder="password" />
             <button className={styles.submit} type="submit">Login</button>
            </form>}</>}
        <button onClick={(e)=>closeModal(e)}>close</button>
      </Modal>
  

</div>
    }
    export default ModalLoginSignUp