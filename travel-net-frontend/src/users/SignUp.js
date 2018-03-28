
// packages
import React from "react";
// import Geocode from "react-geocode";
// import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { connect } from "react-redux"

// actions
import { createUser } from "../actions/users"

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

  render() {
    return (
      <div id="opaque">
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
          {this.props.errors ? this.props.errors : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {errors: state.users.alert}
}

export default connect(mapStateToProps, { createUser })(SignUp)
