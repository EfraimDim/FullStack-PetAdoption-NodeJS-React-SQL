import styles from '../styles/AdminPage.module.css';
import { AppContext } from "../components/AppContext"
import {useState, useEffect, useContext} from "react"
import axios from 'axios'
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function ViewUsers() {


  const {  } = useContext(AppContext);


  return (
    <div>
  view users
    </div>

  );
}

export default ViewUsers;