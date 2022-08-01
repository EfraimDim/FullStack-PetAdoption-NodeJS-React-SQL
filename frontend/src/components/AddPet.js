import { AppContext } from "../components/AppContext";
import { useState, useContext } from "react";
import axios from "axios";
import localforage from "localforage";
import { createRef } from "react";
import styles from "../styles/AddPet.module.css";
import { TextField, InputLabel } from "@mui/material";
import { inputStyles } from "../styles/MaterialUIStyles";
import swal from "sweetalert";

function AddPet() {
  const [type, setType] = useState("dog");
  const [adoptionStatus, setAdoptionStatus] = useState("available");
  const [petName, setPetName] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [colour, setColour] = useState("");
  const [bio, setBio] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietryRestrictions, setDietryRestrictions] = useState("");
  const [breed, setBreed] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { setLoadSpinner, adminInfo } = useContext(AppContext);
  const fileInputRef = createRef();

  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleAdoptionStatus = (e) => {
    setAdoptionStatus(e.target.value);
  };

  const handlePetName = (e) => {
    setPetName(e.target.value);
  };
  const handleHeight = (e) => {
    setHeight(e.target.value);
  };

  const handleWeight = (e) => {
    setWeight(e.target.value);
  };
  const handleColour = (e) => {
    setColour(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleHypoallergenic = (e) => {
    setHypoallergenic(e.target.value);
  };
  const handleDietryRestrictions = (e) => {
    setDietryRestrictions(e.target.value);
  };
  const handleBreed = (e) => {
    setBreed(e.target.value);
  };
  const handleFileInput = () => {
    setSelectedFile(fileInputRef.current.files[0]);
  };

  const addPet = async (e) => {
    try {
      e.preventDefault();
      swal({
        title: "Are you sure?",
        text: "Add new Pet to database",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willUpload) => {
        if (willUpload) {
          setLoadSpinner(true);
          const tokenString = await localforage.getItem("token");
          const token = JSON.parse(tokenString);
          const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };
          const fd = new FormData();
          fd.append("image", selectedFile, `${selectedFile.name}`);
          fd.append("type", type);
          fd.append("adoptionStatus", adoptionStatus);
          fd.append("name", petName);
          fd.append("colour", colour);
          fd.append("height", height);
          fd.append("weight", weight);
          fd.append("bio", bio);
          fd.append("dietryRestrictions", dietryRestrictions);
          fd.append("hypoallergenic", hypoallergenic);
          fd.append("breed", breed);
          fd.append("adminEmail", adminInfo.email);
          await axios.post("http://localhost:5000/pets/addPet", fd, { headers: headers });
          setLoadSpinner(false);
          swal({
            title: "Upload Success!",
            text: `Pet added to Database`,
            icon: "success",
            button: "continue!",
          });
        } else {
          swal("Pet not added!");
        }
      });
    } catch (e) {
      console.log(e);
      setLoadSpinner(false);
      swal({
        title: "Upload Failed!",
        text: `Error: ${e}`,
        icon: "error",
        button: "return",
      });
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Add a Pet to Database:</h1>
      <form className={styles.form} onSubmit={addPet}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <select className={styles.input} required value={type} onChange={handleType}>
          <option defaultValue={true} value="dog">
            Dog
          </option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="fish">Fish</option>
        </select>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <select className={styles.input} required value={adoptionStatus} onChange={handleAdoptionStatus}>
          <option defaultValue value="available">
            Available
          </option>
          <option value="adopted">Adopted</option>
          <option value="fostered">Fostered</option>
        </select>
        <TextField
          size="small"
          required
          type="text"
          value={petName}
          inputProps={{ maxLength: 15 }}
          onChange={handlePetName}
          sx={inputStyles}
          label="name"
        />
        <TextField
          size="small"
          required
          type="text"
          value={colour}
          inputProps={{ maxLength: 30 }}
          onChange={handleColour}
          sx={inputStyles}
          label="colour"
        />
        <InputLabel id="demo-simple-select-label">Height</InputLabel>
        <input className={styles.input} required min={0} max={200} type="number" value={height} onChange={handleHeight} placeholder="height (cm)" />
        <InputLabel id="demo-simple-select-label">Weight</InputLabel>
        <input className={styles.input} required min={0} max={50} type="number" value={weight} onChange={handleWeight} placeholder="weight (kg)" />
        <TextField
          size="small"
          multiline={true}
          required
          type="text"
          value={bio}
          inputProps={{ maxLength: 200 }}
          onChange={handleBio}
          sx={inputStyles}
          label="pet bio"
        />
        <InputLabel id="demo-simple-select-label">Hypoallergenic</InputLabel>
        <select className={styles.input} required value={hypoallergenic} onChange={handleHypoallergenic}>
          <option defaultValue value={false}>
            No
          </option>
          <option value={true}>Yes</option>
        </select>
        <TextField
          size="small"
          multiline={true}
          required
          type="text"
          value={dietryRestrictions}
          inputProps={{ maxLength: 100 }}
          onChange={handleDietryRestrictions}
          sx={inputStyles}
          label="dietry restrictions"
        />
        <TextField
          size="small"
          required
          type="text"
          value={breed}
          inputProps={{ maxLength: 20 }}
          onChange={handleBreed}
          sx={inputStyles}
          label="breed"
        />
        <InputLabel id="demo-simple-select-label">Photo</InputLabel>
        <input
          className={styles.input}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          required
          ref={fileInputRef}
          onChange={handleFileInput}
        />
        <button className={styles.submit} type="submit">
          Add Pet!
        </button>
      </form>
    </div>
  );
}

export default AddPet;
