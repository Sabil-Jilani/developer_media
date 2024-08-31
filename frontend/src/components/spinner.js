import React from 'react'


const spinner =() => {
  return (
    <button className="btn btn-primary center" type="button" disabled>
    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading...
  </button>
  )
}



export default spinner