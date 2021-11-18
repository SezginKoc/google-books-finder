import React, {useState} from "react"
import {Card, CardTitle, CardImg, CardBody, Button, Modal} from "reactstrap";


const BookCard=({
    thumbnail,
    title,
    pageCount,
    language,
    description,
    authors,
    publisher,
    previewLink,
    infoLink
  })=> {
                //! States
    const [modal, setModal]=useState(false);
    const toggle=()=> setModal (!modal);
    return (
    <Card style={{width:"233px"}} className="m-auto m-5 border border-dark border-3 rounded-3">
                <CardImg top className="" style={{width:"100%", height:"233px"}} src={thumbnail} alt={title}/>
                <CardBody>
                    <CardTitle className="card-title" style={{fontWeight:"bold"}}>{title} </CardTitle>
                    <Button onClick={toggle} color="dark"  style={{fontWeight:"bold"}} >More Info</Button>
                </CardBody>
                <Modal isOpen={modal} toggle={toggle}>
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title text-center" id="exampleModalLabel"> {title} </h5>
                        <button 
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={toggle}
                            >
                                <span aria-hidden={true}>X</span>
                            </button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex "> 
                            <img className="border border-dark border-3 rounded-3"  src={thumbnail} alt={title} style={{height:"233px"}}/>
                            <div className="ms-4" > 
                                <p> <span style={{fontWeight:"bold"}}> Page Count: </span> {pageCount} </p>
                                <p> <span style={{fontWeight:"bold"}}> Language: </span> {language} </p>
                                <p><span style={{fontWeight:"bold"}}> Authors: </span> {authors} </p>
                                <p><span style={{fontWeight:"bold"}}> Publisher: </span> {publisher} </p>
                            </div>
                        </div>
                        <div className="mt-3 description" > {description} </div>
                    </div>
                    <div className="modal-footer">
                        <div className="left-slide">
                            <a 
                            href={previewLink}
                            className="btn-link"
                            color="default"
                            type="button"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Preview Link </a>
                    </div>
                    <div className="divider"></div>
                    <div className="right-slide">
                            <a 
                            href={infoLink}
                            className="btn-link"
                            color="default"
                            type="button"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Info Link </a>
                    </div>
                    </div>
                </Modal>
            </Card>
    )};
   

export default BookCard

/* <div> 
    
    
    <div className="card m-auto" style={{width: "18rem"}}>
        <img src={thumbnail} className="card-img-top" style={{width:"100%", height:"233px"}} alt={title}/>
        <div className="card-body">
            <h5 className="card-title card-title-overflow">{title}</h5>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                More Info
                </button>
        </div>
    
        
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" role="dialog" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
                    </div>
                    <div className="modal-body">
                        Exercise
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div> */