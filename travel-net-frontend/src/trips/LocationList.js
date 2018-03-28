
import React from 'react'

import LocationItem from './LocationItem'

const LocationList = (props) => {
    return(
      <div className="location-list">
        {props.locations ? props.locations.map((location, i) =>
        <LocationItem active={props.active} key={i} tripId={props.tripId} id={location.id} lat={location.lat} lng={location.lng}/>) : "Loading" }
      </div>
    )

}


export default LocationList
