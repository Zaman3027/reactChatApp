import React from 'react'
export default function Login(props) {

  return (
    <div>
      <button style ={{padding:50}} onClick={props.handleGoogleSiginIn} >Google Login</button>
    </div>
  )
}

