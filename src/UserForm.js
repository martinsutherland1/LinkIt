import React, {useState} from 'react'
import Request from './helpers/Request'

const UserForm = ({api, setCurrentUser}) => {

    

    const [stateUser, setStateUser] = useState(
        {
            username: "",
            score: 0
        }
    )

    

    const postUser = function(user){
        const request = new Request();
         request.post(api, user)
        .then(() => window.location = '/')
      }

      const updateUser = function(user){
        const request = new Request();
        request.patch(api + user.id, user)
        .then(() => window.location = '/')
      }

      const deleteUser = function(id){
        const request = new Request();
        const url = api + id
        request.delete(url)
        .then(() => window.location = "/admin")
      }
    
    const handleChange = function(event){
        let propertyName = event.target.name;
        let copiedTeam = {...stateUser}
        copiedTeam[propertyName] = event.target.value;
        setStateUser(copiedTeam)
        
    }
    
    const handleSubmit = function(event){
        event.preventDefault();
        setCurrentUser(stateUser.username)
        postUser(stateUser); 
    }

    

    return (
        
        <div >
        <form id='answerEntry' onSubmit={handleSubmit}>
        <label>Name</label>
        <input id='txt-answer' type="text" placeholder="" name="username" onChange={handleChange} value={stateUser.username} />
        <button id='btn-submit' type="submit">Submit name</button>
        </form>
        </div>
        
    )
  
}

export default UserForm;