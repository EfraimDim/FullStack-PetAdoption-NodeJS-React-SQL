import styles from '../styles/Newsfeed.module.css';
import { AppContext } from "../components/AppContext"
import { useContext, useState } from "react"
import { Typography, Pagination} from '@mui/material'


function NewsfeedAdmin() {


  const { newsfeed, paginationCount, paginationNewsfeedArray, setPaginationNewsfeedArray } = useContext(AppContext);

  const [paginationPage, setPaginationPage] = useState(1)
  
  const handlePagination = (e) =>{
    let pageNumber = paginationPage
    if(e.target.tabIndex === 0){
      pageNumber = JSON.parse(e.target.innerText)
    }else if(e.target.dataset.testid === "NavigateNextIcon"){
      pageNumber = paginationPage + 1
    }else{
      pageNumber = paginationPage - 1
    }
      setPaginationPage(pageNumber)
      const spliceStart = (pageNumber -1) * 10
      const spliceEnd = spliceStart + 10
      setPaginationNewsfeedArray(newsfeed.slice(spliceStart, spliceEnd))
  }



  return (<div>
    <h1 className={styles.header}>Newsfeed:</h1>
    <Typography>Page: {paginationPage}</Typography>
        <Pagination count={paginationCount} defaultPage={paginationPage} page={paginationPage} onChange={(e) => handlePagination(e)} />
    {paginationNewsfeedArray.map((update, index) => {  
                    return   (
                            <div key={index} className={styles.newsWrapper}>
                                <div className={styles.date}>{update.date_created.slice(0, 10)}</div>
                                <div className={styles.update}>{update.news}</div>
                            </div>
                            )})}
  
          </div>
  );
}

export default NewsfeedAdmin;