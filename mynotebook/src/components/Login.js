import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {
    const [cred, setCred] = useState({username:"",password:""})
    let history = useNavigate()
    const hSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({username:cred.username, password:cred.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Login successfull ", "success")
            history('/')

          }
          else{
            props.showAlert("Invalid Credential", "danger")
        }
    }
    const onchange = (e)=>{

        setCred({...cred, [e.target.name]:e.target.value}); 
    }
    return (
        <div className='container p-5'>
            <form  onSubmit={hSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="email" name='username'  onChange={onchange} value={cred.username} className="form-control" id="username" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' onChange={onchange}  value={cred.password} className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    )
}

export default Login