import React from "react";
import AddRandomContact from "./AddRandomContact";
import Header from "../Layouts/Header";
import RemoveAllContact from "./RemoveAllContact";
import FavoriteContact from "./FavoriteContact";
import GeneralContact from "./GeneralContact";
import Footer from "../Layouts/Footer";
import AddContact from "./AddContact";

class ContactIndex extends React.Component{

    constructor(porps){
        super(porps);
        this.state = {
            contactList: [
                {
                    id: 1,
                    name: "Vishal Sarvagod",
                    phone: "667-770-2728",
                    email: "vishalsarvagod91@gmail.com",
                    isFavorite: false

                },
                {
                    id: 2,
                    name: "Anuja Yawar",
                    phone: "667-770-2740",
                    email: "Anujayawar@gmail.com",
                    isFavorite: true

                },{
                    id: 3,
                    name: "Vivek Sarvagod",
                    phone: "667-770-2729",
                    email: "viveksarvagod@gmail.com",
                    isFavorite: false

                }
            ],
            selectedContact: undefined,
            isUpdating: false
        }
    }

    handleAddContact = (newContact)=>{
        if(newContact.name === ""){
            return {status : "failure", msg: "Please enter a valid name"};            
        } else if (newContact.phone === ""){
            return {status : "failure", msg: "Please enter a valid phone number"};    
        }

        const duplicateRecord = this.state.contactList.filter((x)=>{
            if(x.name === newContact.name && x.phone === newContact.phone){
                return true;
            }
        })

        if(duplicateRecord.length >0){
            return {status : "failure", msg: "Duplicate Record"};
        }

        const newFinalContact = {...newContact,
            id:this.state.contactList[this.state.contactList.length-1].id+1,
            isFavorite:false};
        
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.concat([newFinalContact]),
            };
        })  
        
        return {status : "success", msg: "Contact was added successfully"};
    }


    handleUpdateContact = (updatedContact)=>{

        console.log(updatedContact);
        if(updatedContact.name === ""){
            return {status : "failure", msg: "Please enter a valid name"};            
        } else if (updatedContact.phone === ""){
            return {status : "failure", msg: "Please enter a valid phone number"};    
        }
                 
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.map((obj)=>{
                    if(obj.id == updatedContact.id){                        
                            return {
                                ...obj, 
                                name: updatedContact.name,
                                email: updatedContact.email,
                                phone: updatedContact.phone
                            }                        
                    }
                    return obj;
                }),

                isUpdating: false,
                selectedContact: undefined
            };
        })  
        
        return {status : "success", msg: "Contact was updated successfully"};
    }


    handleToggleFavorite = (contact)=>{
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.map((obj)=>{
                    if(obj.id === contact.id){
                        return {...obj, isFavorite: !obj.isFavorite};
                    }
                    return obj;
                })
            }
        })
    }

    handleToggleDelete = (contactId)=>{
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.filter((obj)=>{
                    return obj.id !== contactId;
                })
            }
        })
    }

    handleRandomContact = (newContact)=>{
        const newFinalContact = {...newContact,
            id:this.state.contactList[this.state.contactList.length-1].id+1,
            isFavorite:false};

        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.concat([newFinalContact]),
            };
        })  
    }
    

    handleRemoveAll = ()=>{
        this.setState((prevState)=>{
            return{
                contactList: []
            };
        })  
    }

    handleUpdateClick = (contact)=>{
        console.log(contact);
        this.setState((prevState)=>{
            return{
                selectedContact: contact,
                isUpdating: true
            };
        })  
    }

    handleCancelClick = (contact)=>{
        this.setState((prevState)=>{
            return{
                selectedContact: undefined,
                isUpdating: false
            };
        })  
    }

    render(){
        return(
        <div>
            <Header/>
            <div className="container" style={{minHeight:"85vh"}}>
                <div className="row py-3">
                    <div className="col-4 offset-2 row">
                        <AddRandomContact handleRandomContact = {this.handleRandomContact}/>
                    </div>
                    <div className="col-4 row">
                        <RemoveAllContact handleRemoveAll ={this.handleRemoveAll}/>
                    </div>
                    <div className="row py-2">
                    <div className="col-8 offset-2 row">
                        <AddContact handleAddContact = {this.handleAddContact} 
                        selectedContact={this.state.selectedContact} 
                        isUpdating={this.state.isUpdating} 
                        handleCancelClick={this.handleCancelClick}
                        handleUpdateContact= {this.handleUpdateContact}/>
                        </div>
                    </div>
                    <div className="row py-2">
                    <div className="col-8 offset-2 row">
                        <FavoriteContact 
                        contacts={this.state.contactList.filter((u)=> u.isFavorite === true)} 
                        favoriteClick = {this.handleToggleFavorite} 
                        handleToggleDelete={this.handleToggleDelete}
                        handleUpdateClick={this.handleUpdateClick}
                        cancelUpdateClick={this.handleUpdateClick}/>
                        </div>
                    </div>
                    <div className="row py-2">
                    <div className="col-8 offset-2 row">
                        <GeneralContact 
                        contacts={this.state.contactList.filter((u)=> u.isFavorite === false)} 
                        favoriteClick = {this.handleToggleFavorite} 
                        handleToggleDelete={this.handleToggleDelete}
                        handleUpdateClick={this.handleUpdateClick}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        )
    }
}


export default ContactIndex;