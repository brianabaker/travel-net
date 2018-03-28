import React from "react";

import { RIEInput } from "riek";
import _ from "lodash";

import { editTripLocation } from "../actions/trips";

import { getLatLng, findAddress } from "../helpers";

import {connect} from 'react-redux'

class LocationItem extends React.Component {
  state = {
    locationName: "",
    id: ""
  };

  componentDidMount() {
    findAddress(this.props.lat, this.props.lng).then(res => {
      this.setState({
        locationName: res
      });
    });
    this.setState({
      id: this.props.id
    });
  }

  handleChange = trip => {
    getLatLng(trip.location).then(res =>
      this.props.editTripLocation(this.state.id, res.lat, res.lng, this.props.tripId)
    );
  };

  handleActive = () => {
    if (this.props.active) {
      return(
        <li>
          <RIEInput
            value={this.state.locationName}
            change={this.handleChange}
            propName="location"
            validate={_.isString}
          />
        </li>
      )
    } else {
      return(
        <li>{this.state.locationName}</li>
      )
    }
  }
  render() {
    return (
      <div>
        {this.handleActive()}
      </div>
    );
  }
}


export default connect(null, { editTripLocation })(LocationItem);
