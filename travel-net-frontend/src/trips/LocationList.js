
import React from 'react'

import LocationItem from './LocationItem'

const LocationList = (props) => {

    return(
      <div>
        {props.locations ? props.locations.map((location, i) =>
        <LocationItem key={i} id={location.id} lat={location.lat} lng={location.lng}/>) : "Loading" }
      </div>
    )

}


export default LocationList
