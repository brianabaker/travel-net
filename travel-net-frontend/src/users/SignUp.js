
// packages
import React from "react";
import Geocode from "react-geocode";
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
    // city: "",
    // country: "",
    // region: ""
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // selectCountry = (val) => {
  //    this.setState({ country: val });
  //  }
  //
  //  selectRegion = (val) => {
  //    this.setState({ region: val });
  //  }

// this is really first geocoding and then making the user
  addUser = (e) => {
    e.preventDefault()
    getLatLng(this.state.location)
    .then(res => {
      this.props.createUser(this.state.username, this.state.password, this.state.passwordConfirmation, res)
    })
  };

  render() {
    // console.log(this.props)
    return (
      <div>
        <form onSubmit={this.addUser}>
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

// <div>
//   <label>Country
//     <CountryDropdown
//       value={this.state.country}
//       blacklist = {["CG", "CD", "SH", "GS"]}
//       onChange={(val) => this.selectCountry(val)} />
//   </label>
//   <label>Region
//     <RegionDropdown
//       country={this.state.country}
//       value={this.state.region}
//
//       onChange={(val) => this.selectRegion(val)} />
//   </label>
// </div>
// <label>City
//   <input
//     name="city"
//     value={this.state.city}
//     onChange={this.onInputChange}
//   />
// </label>

export default connect(null, { createUser })(SignUp)
