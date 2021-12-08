import styles from '../styles/AdminPage.module.css';
import { AppContext } from "../components/AppContext"
import {useState, useEffect, useContext} from "react"
import axios from 'axios'
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function EditPet() {


  const {  } = useContext(AppContext);


  return (
    <div>
  edit pet
    </div>

  );
}

export default EditPet;