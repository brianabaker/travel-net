

import React from 'react'

class FindFriends extends React.Component {
  state = {
    query: ''
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleKeyDown = (event) => {
    let key = event.keyCode
    let min_chars = 2
    if(key===13){
      event.preventDefault()
      if (this.state.query.length <= min_chars) {
        console.log('Not enough characters')
      } else {
        this.props.search(this.state.query)
      }
    } else if ( key == 8 || key == 46 ) {
      this.props.undo()
    }
  }

  render(){
    return(
      <form className="ui icon input">
        <input type="text" name="query" value={this.state.query} onInput={this.handleInput} onKeyDown={this.handleKeyDown} placeholder="Find New Friends"/>
        <i className="search icon"></i>
      </form>
    )
  }
}

export default FindFriends
