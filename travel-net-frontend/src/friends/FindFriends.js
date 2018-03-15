

import React from 'react'
import { connect } from 'react-redux'
import { searchUsers } from '../actions/users'

class FindFriends extends React.Component {
  state = {
    query: ''
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleKeyPress = (target) => {
    if(target.charCode===13){
      target.preventDefault()
      this.props.searchUsers(this.state.query)
    }
  }

  render(){
    return(
      <form className="ui icon input">
        <input type="text" name="query" value={this.state.query} onInput={this.handleInput} onKeyPress={this.handleKeyPress} placeholder="Find New Friends"/>
        <i className="search icon"></i>
      </form>
    )
  }
}

export default connect(null, { searchUsers })(FindFriends)
