
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

  render(){
    return(
      <div>
      <div id="opaque">
        {this.props.error ?
          <div className="ui warning message">
            {this.props.error}
          </div>
          : null }
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
            <button className="fluid green ui button">Sign In</button>
          </form>
            <button className ="tiny ui button" style={{marginTop: "20px", float: "right"}} onClick={this.props.renderSignUpPage}>Or Sign Up</button>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {error: state.errors.errors}
}

export default connect(mapStateToProps, {login, renderSignUpPage})(SignIn)
