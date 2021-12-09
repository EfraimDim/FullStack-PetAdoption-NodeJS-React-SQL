import { AppContext } from "../components/AppContext"
import {useContext} from "react"
import SearchPets from './SearchPets'
import EditPetForm from './EditPetForm'

function EditPet() {


  const { petDetailsToEdit } = useContext(AppContext);

  return (
    <div>
      {petDetailsToEdit ? 
        <EditPetForm />
       :<SearchPets />}
    </div>

  );
}

export default EditPet;