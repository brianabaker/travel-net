
import React from 'react'
import {findAddress} from '../helpers'


class LocationList extends React.Component {
  state = {
    locations: ''
  }

  componentDidMount(){
    this.props.locations.map(location => {
      let lat = parseFloat(location.lat.replace('"','').replace('"',''));
      let lng = parseFloat(location.lng.replace('"','').replace('"',''));
      findAddress(lat, lng).then(res => {
        this.setState({
          locations: [...this.state.locations, res]
        })
      })
    }
    )
  }


  render() {
    return(
      <div>
        {this.state.locations ? this.state.locations.map((location, i) =>
        <li key={i}>{location}</li>) : "Loading" }
      </div>
    )
  }
}

export default LocationList
