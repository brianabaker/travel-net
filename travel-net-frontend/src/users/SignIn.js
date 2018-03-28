
// packages
import React from 'react'
import { connect } from "react-redux"

// actions
import { login, renderSignUpPage } from "../actions/users"

class SignIn extends React.Component {

  state = {
    username: '',
    password: '',
    alert: ''
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

    // {this.props.alert ? <p className="color-red" style={{backgroundColor: "black"}}><strong>{this.props.alert}</strong></p> : null}
  render(){
    console.log(this.props.alert)
    return(
      <div>
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
            <div>Or Sign Up<button onClick={this.props.renderSignUpPage}>Here</button></div>
            <br/><br/>
      </div>
    </div>
    )
  }
}

    // {this.props.alert ? this.props.alert : null}

const mapStateToProps = (state) => {
  return {alert: state.users.alert}
}

export default connect(mapStateToProps, {login, renderSignUpPage})(SignIn)
