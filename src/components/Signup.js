import React,{useState} from "react";
import { useNavigate } from 'react-router-dom' ;

const Signup = () => {


  const navigate = useNavigate();
  const [credential, setcredential] = useState({name: "",email:"",password:"",cpassword:""})
 
   const handle= async (e)=>{
     e.preventDefault()
     const  {name,email,password}=credential 
     const response = await fetch("http://localhost:5000/api/auth/createuser", {
     method: "POST",
       headers: {
         "Content-Type": "application/json"
        },
       body: JSON.stringify({name,email,password }),
     });
     const json=await response.json();
       localStorage.setItem('token',json.authtoken)
       localStorage.removeItem('token')
       navigate("/login")
    
   }
   const onChange =(e)=>{
     //syntax
     // remember for onchange text i.e while changing text in form automatically change 
     setcredential({...credential,[e.target.name]: e.target.value})
   }








  return (
      <div className="container">
    <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handle}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="name" className="form-control" onChange={onChange} name="name"required minLength={5}/>
                      <label className="form-label" htmlFor="email">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="email" className="form-control" onChange={onChange} name="email" />
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="password" className="form-control" onChange={onChange} name="password" required minLength={5}/>
                      <label className="form-label" htmlFor="fpassword">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="cpassword" className="form-control" onChange={onChange} name="cpassword" required minLength={5}/>
                      <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>
</div>
  )
}

export default Signup