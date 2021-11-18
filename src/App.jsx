import {useState} from "react";   //! HOOK   
import React from "react";
import './AppStyle.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import BookCard from "./BookCard.jsx"



// import {InputGroup, Input, InputGroupText, Button} from "reactstrap"
// import {Input, Label, FormGroup, Spinner} from "reactstrap"

function App() {


                        //! States
const [maxResults, setMaxResults]=useState(10);
const [startIndex, setStartIndex]=useState(0);
const [query, setQuery]=useState("");
const [loading, setLoading] = useState(false)
const [cards, setCards]=useState([])

//! Handle Search
    const handleSubmit =() => {
      setLoading(true);
      if (maxResults > 40 || maxResults<1){
        toast.error("max result must be between 1 and 40")
      }
      else {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
        ).then(res=>{
          if (startIndex > res.data.totalItems || startIndex < 0){
            toast.error(`max results must be between 1 and ${res.data.totalItems} `);
          } 
          else {
            if (res.data.items.length > 0) {
              setCards(res.data.items)
              setLoading(false)
            }
          }
         }).catch(err => {
           setLoading(true)
           console.log(err.response);
          //  toast.error(`${err.response.data.error.message}`)
           
         });
      }
    };
     const  handleKeyPress= (event)=>{
        if(event.keyCharCode===13){
          event.preventDefault();
          return handleSubmit
        } 
      }
  
  //! Main Show Case
      const mainHeader =() => {

      
        return (
          
          <div className="main-image d-flex justify-content-center align-items-center flex-column">

            {/* Overlay */}
            <div className="filter"> </div>
            <h1 className="display-2 text-center text-white mb-3" style={{zIndex:2}}>Google Books</h1>

                                              
            <div style={{width:"60%", zIndex:2}}> 

                                              {/*!!!! Bootsrap ile Search Bar*/}
                <div className="input-group mb-3" >
                    <input type="text"
                      onKeyPress={handleKeyPress}
                      value={query}
                      onChange={e=> setQuery(e.target.value)}
                      className="form-control fs-4" 
                      placeholder="Search Book" 
                      aria-label="Recipient's username" 
                      aria-describedby="basic-addon2"/>
                    <button onClick={handleSubmit} className="btn btn-secondary" type="button" id="button-addon2">
                      <i className="fas fa-search fs-4"></i>
                    </button>
                </div>

            {   }
                                                {/*!!!! Reactstrap ile Search Bar*/}
                 {/* <InputGroup size="lg" className="mb-3">
                  <Input placeholder="Book Search"/>
                  <InputGroupText addonType="append">
                    <Button color="secondary">
                      <i className="fas fa-search"></i>
                    </Button>
                  </InputGroupText>
                </InputGroup>  */}


                                                {/*!!!! Bootsrap ile Form */}
                <div className="d-flex text-white justify-content-center  ">
                  <div className="mb-3 mx-4">
                    <label htmlFor="maxResults" className="form-label">Max Results</label>
                    <input 
                      value={maxResults}
                      onChange={e=> setMaxResults(e.target.value)}
                      type="number" 
                      className="form-control" 
                      id="maxResults" 
                      placeholder="Max Results"/>
                  </div>
                  <div className="mb-3 mx-4">
                    <label htmlFor="startIndex" className="form-label">Start Index</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="startIndex" 
                      placeholder="Start Index"
                      value={startIndex}
                      onChange={e=> setStartIndex(e.target.value)}
                      />
                      
                  </div>

                                                {/* !!! Reactstrap ile form */}

                  {/* <FormGroup className="ml-5 mx-4">
                    <Label for="maxResults">Max Results</Label>
                    <Input type="number" id="maxResults" placeholder="Max Results"/>
                  </FormGroup>
                  <FormGroup className="ml-5 mx-4">
                    <Label for="startIndex">Start Index</Label>
                    <Input type="number" id="startIndex" placeholder="startIndex "/>
                  </FormGroup> */}
                </div>
            </div>
          </div>
        )
      }
  
      const handleCards = ()=> {
        console.log(cards)

        const items=cards.map((item, i)=>{
          let thumbnail ="";
          if(item.volumeInfo.imageLinks){
            thumbnail=item.volumeInfo.imageLinks.thumbnail;
          }
          return (
            <div className="col-lg-3 col-md-6 mb-3" key={item.id}>
              <BookCard 
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
              />
            </div>
          )
        })
        
        if (loading) {
          return (
                      //! Bootstrap ile spinner
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
                  
                 //! Reactstrap ile spinner
            /*<div className="d-flex justify-content-center mt-3">
              <Spinner style={{width:"3rem", height:"3rem"}}/>
            </div> */
          )
        } else {
          return (
            <div className="container my-5">
              <div className="row">{items}</div>
            </div>
          );
        }
      }

  return (
    <div className="w-100 h-100">  
          {mainHeader()}
          {handleCards()}
          <ToastContainer/>
    </div>
  );
}

export default App;
