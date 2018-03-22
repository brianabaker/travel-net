
import React from 'react'

import { RIEInput } from 'riek'
import _ from 'lodash'

import {getLatLng, findAddress} from '../helpers'

class LocationItem extends React.Component {
  state = {
    locationName: '',
    id: ''
  }

  componentDidMount() {
    findAddress(this.props.lat, this.props.lng).then(res => {
      this.setState({
        locationName: res
      })
    })
    this.setState({
      id: this.props.id,
    })
  }

  handleChange = (trip) => {
    getLatLng(trip.location).then(res => {
      fetch(`http://localhost:3000/triplocations/${this.state.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lat: res.lat,
          lng: res.lng
        })
      })
    })
  }

  render() {

    return(
      <div>
      <li><RIEInput
        value={this.state.locationName}
        change={this.handleChange}
        propName='location'
        validate={_.isString} />
        </li>
      </div>
    )
  }
}

  // <li key={this.props.i} onClick={this.renderForm}>{this.props.data}</li>

export default LocationItem
