
// packages
import React from 'react'
import { connect } from "react-redux"

// actions
import { login } from "../actions/users"

class SignIn extends React.Component {

  state = {
    username: '',
    password: ''
    }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  findUser = (e) => {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  render(){
    return(
      <div id="opaque">
        <div><h4>Sign In!</h4></div>
          <form className="ui form" onSubmit={this.findUser}>
            <div className="field"><label>Username
              <input type="text" value={this.state.username} name="username" placeholder="username"
              onChange={this.onInputChange}/>
              </label>
            </div>
            <div className="field"><label>Password
              <input type="password" value={this.state.password} name="password" placeholder="password"
              onChange={this.onInputChange}/>
              </label>
            </div>
            <input type="submit"/>
          </form>
            <div>Or Sign Up<button>Here</button></div>
            <br/><br/>

      </div>
    )
  }
}

    // {this.props.alert ? this.props.alert : null}

const mapStateToProps = (state) => {
  return {alert: state.users.alert}
}

export default connect(mapStateToProps, {login})(SignIn)
