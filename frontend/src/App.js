import styles from './styles/App.module.css';
import { AppContext } from "./components/AppContext"
import {useState} from "react"
import LoginSignUp from './components/LoginSignUp'
import HomePage from './components/HomePage'

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedInInfo, setLoggedInInfo] = useState(null)


  function openModal() {
    setModalIsOpen(true);
  }


  return (
    <AppContext.Provider value={{
      modalIsOpen,
      setModalIsOpen,
      loggedInInfo,
      setLoggedInInfo
    }}>
    
    <div>
      {loggedInInfo ? <HomePage /> :<>
      <nav className={styles.navBar}>
      <button></button>
      <div onClick={openModal} className={styles.login}>Login</div>
      </nav>
      <h1 className={styles.header}>Welcome to the pet adoption agency!</h1>
      <LoginSignUp /></>}
    </div>
    </AppContext.Provider>
  );
}

export default App;
