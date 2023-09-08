const RemoveAllContact = (props)=>{
    return(
        <div>
            <button className="btn btn-danger form-control" onClick={()=>props.handleRemoveAll()}>Remove All</button>
        </div>
    );
}

export default RemoveAllContact;