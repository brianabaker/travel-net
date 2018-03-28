
import React from 'react'
import {connect} from 'react-redux'

// let checkPastTrips = () => {
//   if (props.pastTrips) {
//       props.pastTrips.map(trip => {
//         if (trip.name === '' ) {
//           console.log(trip.name === '')
//           return(
//             <li key={trip.id}>"Untitled Trip"</li>
//           )
//         } else {
//           console.log('if else')
//           return(
//             <li key={trip.id}>{trip.name}</li>
//           )
//         }
//       })
//   }
// }


// let checkPastTrips = () => {
//   if (props.pastTrips) {
//     console.log('HERE', props.pastTrips)
//       return props.pastTrips.map(trip => {
//         console.log('trip', trip)
//         console.log("name", trip.name)
//         return(
//           <li>Trip: {trip.name</li>
//
//         )
//     })
//   }
// }

const PastTrips = (props) => {
  console.log('past trips', props)

  let checkPastTrips = () => {
    if (props.pastTrips) {
        return props.pastTrips.map(trip => {
          if (trip.name === '' ) {
            console.log(trip.name === '')
            return(
              <li key={trip.id}>Untitled Trip!</li>
            )
          } else {
            console.log('if else')
            return(
              <li key={trip.id}>{trip.name}</li>
            )
          }
        })
    }
  }



  return(
    <div>
    <p>HEYYYYY</p>
      <ul>{checkPastTrips()}</ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {pastTrips: state.users.pastTrips}
}

export default connect(mapStateToProps)(PastTrips)
