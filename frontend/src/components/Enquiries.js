import styles from '../styles/Enquiries.module.css';
import { AppContext } from "../components/AppContext"
import { useContext } from "react"
import ViewEnquiry from './ViewEnquiry'
import axios from 'axios'
import swal from 'sweetalert'

function Enquiries() {

  const { enquiryArray, setEnquiryArray, viewEnquiry, setViewEnquiry, tokenFromLocalforage } = useContext(AppContext);

  const goToEnquiry = (enquiry) => {
        setViewEnquiry(enquiry)
    }

    const enquiryToDelete = async(e, enquiryID) => {
        try{
            e.stopPropagation()
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this enquiry!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(async(willDelete) => {
                if (willDelete) {
                    const headers = await tokenFromLocalforage()
                    const enquiryToInProgress = await axios.delete(`http://localhost:5000/users/enquiryToDelete/${enquiryID}`, {headers:headers})
                    const newEnquiriesArray = enquiryArray.filter(enquiry => enquiry.enquiry_ID !== enquiryID)
                    setEnquiryArray(newEnquiriesArray)
                    swal({
                        title: "Enquiry Deleted!",
                        icon: "success",
                        button: "return",
                      });
                } else {
                  swal("The Enquiry is safe!");
                }
              });
    }catch(e){
        console.log(e) 
        swal({
            title: "Enquiry Delete Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          });
        }
    }


  return (<div>
  {viewEnquiry ? <ViewEnquiry/> :<div>
    <h1>Enquiries:</h1>
    {enquiryArray.map((enquiry, index) => {  
                    return   (
                            <div key={index} onClick={() => goToEnquiry(enquiry)} className={styles.enquiryWrapper}>
                                <div className={styles.date}>{enquiry.date_created.slice(0, 10)}</div>
                                <div className={styles.email}>{enquiry.user_Email}</div>
                                <div className={styles.enquiry}>{enquiry.enquiry.slice(0, 49)}...</div>
                                <div className={
                                enquiry.status === "resolved" && styles.green || 
                                enquiry.status === 'unresolved' && styles.red ||
                                enquiry.status === "in progress" && styles.yellow}>{enquiry.status}</div>
                                {enquiry.status === "resolved" && <button onClick={(e) => enquiryToDelete(e, enquiry.enquiry_ID)} className={styles.delete}>Delete</button>}
                            </div>
                            )})}
    </div>}
    </div>
  );
}

export default Enquiries;