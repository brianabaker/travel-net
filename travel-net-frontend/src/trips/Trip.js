
import React from 'react'

import {connect} from 'react-redux'
import NewTripForm from './newTripForm'
class Trip extends React.Component {
  state = {
    renderForm: false
  }

  renderForm = () => {
    this.setState({
      renderForm: true
    })
  }

  render(){
    return(
      <div>
        {this.state.renderForm ? <NewTripForm/> :
        <React.Fragment>
          <button onClick={this.renderForm} className="ui green button">Make a trip!</button>
          No past trips!
        </React.Fragment>
        }
      </div>
    )
  }
}



export default connect()(Trip)
