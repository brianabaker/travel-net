
// packages
import React from 'react';

// styles
import './App.css';
import image from './images/small-world.jpeg'

//components
import SignIn from './users/SignIn'

const App = (props) => {
  let sectionStyle = {
      margin: 0,
      height: "100vh",
      backgroundSize: "cover",
      backgroundImage: `url(${image})`
    }

  return(
    <div className="ui grid" style={sectionStyle}>
      <div className="five wide column"></div>
      <div className="five wide column">
        <h4>Welcome to Travel Net</h4>
        <SignIn/>
        </div>
    </div>
  )
}

export default App
