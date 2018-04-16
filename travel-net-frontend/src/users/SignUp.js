
// react, redux
import React from "react";
import { connect } from "react-redux"

// actions
import { createUser, renderAddBioPage } from "../actions/users"

//helpers
import {getLatLng} from '../helpers'


class SignUp extends React.Component {
  state = {
    username: "",
    password: '',
    passwordConfirmation: '',
    location: ''
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

// this is really first geocoding and then making the user
  addUser = (e) => {
    e.preventDefault()
    getLatLng(this.state.location)
    .then(res => {
      this.props.createUser(this.state.username, this.state.password, this.state.passwordConfirmation, res)
    })
  };

  ifErrors = () => {
    let errorHTML = '';
    if (this.props.errors){
      Object.keys(this.props.errors).map(errors => {
        console.log('error', this.props.errors[errors]);
        Object.keys( this.props.errors[errors] ).map(errorKey => {
          console.log('erroryKey', errorKey, this.props.errors[errors][errorKey] )
           errorHTML += `${errorKey} - ${this.props.errors[errors][errorKey]}`
        })

      })
      return(
        <div className="ui warning message">
          <ul>{errorHTML}</ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div id="opaque">
        {this.props.redirect ? this.props.renderAddBioPage() : null}
        {this.ifErrors()}
        <form className="ui form" onSubmit={this.addUser}>
          <div>
            <label>Username
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onInputChange}
              />
            </label>
          </div>
          <div>
            <label>Password
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
              />
            </label>
          </div>
          <div>
            <label>Password Confirmation
              <input
                type="password"
                name="passwordConfirmation"
                value={this.state.passwordConfirmation}
                onChange={this.onInputChange}
              />
            </label>
          </div>
          <div>
            <label>Where Do You Live?
              <input
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.onInputChange}
              />
            </label>
          </div>
          <input type="submit"/>
          </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {errors: state.errors.errors,
          redirect: state.users.redirect}
}

export default connect(mapStateToProps, { createUser, renderAddBioPage })(SignUp)
