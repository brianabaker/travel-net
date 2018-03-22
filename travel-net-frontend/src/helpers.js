
import Geocode from "react-geocode";

export function findAddress(lat, lng) {
  Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
  Geocode.enableDebug();
    return Geocode.fromLatLng(lat, lng).then(
      response => {
        let localityResponse = response.results.find(place =>
           place.types.includes("locality"))
        let politicalResponse = response.results.find(place =>
           place.types.includes("political"))
        if (localityResponse) {
          return localityResponse.formatted_address
        } else if (politicalResponse) {
          return politicalResponse.formatted_address
        } else {
          return "Try Again"
        }
      },
      error => {
        console.error(error);
        return ''
      }
    )

}

export function getLatLng(address) {
  Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
  Geocode.enableDebug();
  return Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      return {lat, lng}
    },
    error =>
     {
      console.error(error);
    }
  )
}


// export function getLatLng(lat, lng) {
//   Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
//   Geocode.enableDebug();
//     return Geocode.fromLatLng(lat, lng).then(
//       response => {
//           return response.results.find(place =>
//            place.types.includes("locality")
//         ).formatted_address
//       },
//       error => {
//         console.error(error);
//         return ''
//       }
//     )
//
// }
