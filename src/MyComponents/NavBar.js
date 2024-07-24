import React from 'react'


export const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{props.title}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
      </ul>
    </div>
    <div classNameName='ml-5'>
      <span className="material-symbols-outlined" style={{marginRight:'10px'}}>favorite</span>
      <span className="material-symbols-outlined" style={{marginRight:'10px'}}>Shopping_Cart</span>
      <span className="material-symbols-outlined" style={{marginRight:'10px'}}  >Person</span>
    </div>
  </div>
</nav>
  )
}