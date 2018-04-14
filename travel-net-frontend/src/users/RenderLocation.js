import React from 'react'

import {findAddress} from '../helpers'

class RenderLocation extends React.Component {
  state = {
    location: ''
  }

  componentDidMount(){
    this.showLocation(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lat !== nextProps.lat) {
      this.showLocation(nextProps)
    }
  }

  showLocation = (nextProps) => {
      let lat = parseFloat(nextProps.lat)
      let lng = parseFloat(nextProps.lng)
      return findAddress(lat, lng)
      .then(data =>  {
        this.setState({
          location: data
        })
      })
  }

  renderLocation = () => {
    if (this.state.location) {
      return(
        <h4>Currently in: {this.state.location}</h4>
      )
    }
  }

  render(){
    return(
      <div>
        {this.renderLocation()}
      </div>
    )
  }
}

export default RenderLocation
