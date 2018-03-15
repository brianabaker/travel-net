
// packages
import React from 'react'
import { connect } from "react-redux"

// actions
import { findUser } from "../actions/users"

class SignIn extends React.Component {
  state = {
    username: ''
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  findUser = (e) => {
    e.preventDefault()
    this.props.findUser(this.state.username)
  }

  render(){
    return(
      <div>
        <div><h4>Sign In!</h4></div>
          <form onSubmit={this.findUser}>
            <div><label>Username
              <input type="text" value={this.state.username} name="username" placeholder="username"
              onChange={this.onInputChange}/>
              </label>
            </div>
            <input type="submit"/>
          </form>
            <div>Or Sign Up<button>Sign Up</button></div>
      </div>
    )
  }
}

export default connect(null, {findUser})(SignIn)
