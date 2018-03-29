import "react-image-gallery/styles/css/image-gallery.css";
import React from 'react'
import {connect} from 'react-redux'
import ImageGallery from 'react-image-gallery';

class TripImages extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    console.log('BEFORE', this.props)
    console.log('NEXT PROPS', nextProps)
    if (this.props.tripPhotos !== nextProps.tripPhotos) {
      return true
    } else {
      return false
    }
  }

  gatherPhotos = () => {
    return(
      this.props.tripPhotos.reverse().map(photo => {
      return (
        <div className="column" key={photo.id}>
          <img src={photo.trip_photo_url} key={photo.id} height="100px" width="150px" alt={photo.id}/>
        </div>
        )
      })
    )
  }

  render(){
    return(
      <div className="ui four column grid">
        <div className="row">
          {this.gatherPhotos()}
        </div>
      </div>
    )
  }
}

// {{overflow: "auto", overflowY: "hidden"}}

// const images = [
//    props.tripPhotos.map(photo => ({
//     original: photo.trip_photo_url
//   }),
// )]
// return(
//   <div>
//     <ImageGallery items={images} />
//   </div>
// )
const mapStateToProps = (state) => {
  return {tripPhotos: state.trips.tripPhotos}
}

export default connect(mapStateToProps)(TripImages)
