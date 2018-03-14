
// packages
import React from "react";
import Geocode from "react-geocode";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class SignUp extends React.Component {
  state = {
    username: "",
    city: "",
    country: "",
    region: ""
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  selectCountry = (val) => {
     this.setState({ country: val });
   }

   selectRegion = (val) => {
     this.setState({ region: val });
   }

// this is really first geocoding and then making the user
  addUser = (e) => {
    e.preventDefault()
    Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
    Geocode.enableDebug();
    let fullLocation = `${this.state.city} ${this.state.region} ${this.state.country}`
    console.log(fullLocation)
    Geocode.fromAddress(fullLocation).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        fetch(`http://localhost:3000/cities/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            city: this.state.city,
            country: this.state.country,
            region: this.state.region,
            lat: lat,
            lng: lng
          })
        })
        .then(res => res.json())
        .then(json => console.log(json))
        // .then(cityJSON => {
        //   this.postUser(this.state.username, cityJSON.id)
        // })
      },
      error =>
        if error is Error: Server returned status code ZERO_RESULTS
       {
        console.error(error);
      }
    );
  };

  postUser = (username, city_id) => {
    console.log('postuser', username)
    console.log('postuser', city_id)
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        makeUser: {
          username: username,
          city_id: city_id
        }
      })
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };


  render() {
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
          <div style={{paddingBottom: "20px"}}/>
            <label>Location</label>
          <div>
            <label>Country
              <CountryDropdown
                value={this.state.country}
                blacklist = {["CG", "CD", "SH", "GS"]}
                onChange={(val) => this.selectCountry(val)} />
            </label>
            <label>Region
              <RegionDropdown
                country={this.state.country}
                value={this.state.region}

                onChange={(val) => this.selectRegion(val)} />
            </label>
          </div>
          <label>City
            <input
              name="city"
              value={this.state.city}
              onChange={this.onInputChange}
            />
          </label>
          <input type="submit"/>
          </form>
      </div>
    );
  }
}

export default SignUp
