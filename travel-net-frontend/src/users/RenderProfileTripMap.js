
import React from 'react'
import {connect} from 'react-redux'
import TripMap from '../trips/TripMap'
import {fetchTripMap} from '../actions/trips'

class RenderProfileTripMap extends React.Component {

  componentDidMount(){
    if (this.props.friends && this.props.selectedUser.on_trip){
      this.props.fetchTripMap(this.props.selectedUser.current_trip_id)
    }
  }

  render(){
    console.log('rendertripmap', this.props.tripLocations)
    return(
      <React.Fragment>
        {this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {tripLocations: state.trips.tripLocations}
}

export default connect(mapStateToProps, {fetchTripMap})(RenderProfileTripMap)
