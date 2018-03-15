
import React from 'react'
import Geocode from "react-geocode";

class FindAddress extends React.Component {


// locality

// "48.8583701", "2.2922926" PARIS says the neighborhood and the city, country name
// lat: 34.052234, lng: -118.243685 LA is number 4
// lat: 37.774929, lng: -122.419416 SF one has the zipcode
//lat: 51.507351, lng: -0.127758 LONDON has the zipcode in it too
// "13.722416", "100.681610" array number changes for bangkok.... this won't work well

componentDidMount(){
  Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
  Geocode.enableDebug();
  Geocode.fromLatLng("34.052234", "-118.243685").then(
    response => {
      const address = response.results[0].formatted_address;
      console.log('find address', response.results.find(place => {
        return place.types.includes("locality")
      }).formatted_address );
    },
    error => {
      console.error(error);
    }
  )
}
  render() {
    return(
      <div>
      </div>
    )
  }

}

export default FindAddress
