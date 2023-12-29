import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [cred, setCred] = useState({name:"",username:"",password:"",cpassword:""})
  const onchange = (e)=>{

    setCred({...cred, [e.target.name]:e.target.value}); 
}
let history = useNavigate()
const hSubmit = async(e)=>{
  e.preventDefault();
  const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:cred.name, username:cred.username, password:cred.password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token', json.authtoken)
      props.showAlert("User created ", "success")
      history('/login')

    }
    else{
      props.showAlert("Invalid user", "danger")
    }
}


  return (
    <div className='container'>
      <form onSubmit={hSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onchange} aria-describedby="emailHelp"  name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="email" className="form-control" id="username" onChange={onchange} aria-describedby="emailHelp" name='username' />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onchange} name='password' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onchange} name='cpassword' minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup