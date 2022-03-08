import React from 'react'
import { useNavigate } from 'react-router-dom' ;
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  // let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active"  aria-current="page" href="/About">About</a>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
        <a className="btn btn-primary mx-1" role="button" href="/login">Login</a>
        <a className="btn btn-primary mx-1" role="button" href="/signup">Signup</a>
      </form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>

  )
}

export default Navbar