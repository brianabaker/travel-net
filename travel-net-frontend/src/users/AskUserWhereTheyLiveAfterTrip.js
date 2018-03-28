
import React from 'react'
// import Popup from "reactjs-popup";
import {connect} from 'react-redux'
import {getLatLng} from '../helpers'
import {changeUserLocation} from '../actions/users'
class AskUserWhereTheyLiveAfterTrip extends React.Component {

  state = {
    location: ''
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitNewLocation = (e) => {
    e.preventDefault()
    getLatLng(this.state.location).then(res => {
      this.props.changeUserLocation(this.props.currentUser, res.lat, res.lng)
    })
  }

  render() {
    return(
      <div>
        <h4>Where are you living now?</h4>
          <form className="ui form" onSubmit={this.submitNewLocation}>
            <div className="four wide field">
              <input type="text" value={this.state.location} name="location" placeholder="Location"
              onChange={this.onInputChange}/>
            </div>
            <button className="ui green button">Alright</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}
export default connect(mapStateToProps, {changeUserLocation})(AskUserWhereTheyLiveAfterTrip)
