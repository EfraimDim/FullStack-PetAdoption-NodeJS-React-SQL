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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

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
    const navSignUp = () => {
        setIsSignUp(true)
    }
    const navLogin = () => {
        setIsSignUp(false)
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
            phoneNumber: phoneNumber
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
    const login = async(e) => {
        e.preventDefault();
        const loginUser = await axios.post("/users/login", {
            email: emailLogin,
            password: passwordLogin,
         
          })
        if(loginUser.data.message === "Login Success!"){
            alert(loginUser.data.message)
            setLoggedInInfo(loginUser.data.userInfo)
            setModalIsOpen(false)
            const tokenSet = await localforage.setItem('token', JSON.stringify(loginUser.data.token));
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
        </nav>
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
            </form>}
        <button onClick={(e)=>closeModal(e)}>close</button>
      </Modal>
  

</div>
    }
    export default ModalLoginSignUp