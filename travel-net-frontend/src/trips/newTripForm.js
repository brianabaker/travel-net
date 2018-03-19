
import React from 'react'
import {connect} from 'react-redux'
import Geocode from "react-geocode";
import {createTrip} from '../actions/trips'


class NewTripForm extends React.Component {
  state = {
    tripName: '',
    firstLocation: ''
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.tripName)
    console.log(this.state.firstLocation)
    console.log(this.props)
    Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
    Geocode.enableDebug();
    Geocode.fromAddress(this.state.firstLocation).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.props.createTrip(this.props.currentUser, this.state.tripName, lat, lng)
      },
      error =>
       {
        console.error(error);
      }
    )
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="tripName" value={this.state.tripName} onChange={this.handleInput}/>
          <input type="text" name="firstLocation"
          value={this.state.firstLocation} onChange={this.handleInput}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {createTrip})(NewTripForm)
