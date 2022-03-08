import React,{useState} from "react";
import { useNavigate } from 'react-router-dom' ;
const Login = () => {
   const navigate = useNavigate();
   const [credential, setcredential] = useState({email:"",password:""})
  
    const handle= async (e)=>{
      e.preventDefault()
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
         },
        body: JSON.stringify({email: credential.email,password: credential.password }),
      });
      const json=await response.json();
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate("/")
      }
      else{
        alert("invalid credentials");
      }
    }
    const onChange =(e)=>{
      //syntax
      // remember for onchange text i.e while changing text in form automatically change 
      setcredential({...credential,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handle}>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            value={credential.email}
            
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChange}
            value={credential.password}
         
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
