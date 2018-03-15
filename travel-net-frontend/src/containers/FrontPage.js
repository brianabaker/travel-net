import React from 'react'

// import { Link } from "react-router-dom"
import SignIn from '../users/SignIn'
const FrontPage = (props) => {
  console.log('front page')
  return(
    <div>
      <h4>Welcome to Travel Net</h4>
      <SignIn />
    </div>
  )
}

export default FrontPage
