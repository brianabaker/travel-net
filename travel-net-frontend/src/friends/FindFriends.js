

import React from 'react'

class FindFriends extends React.Component {
  state = {
    query: '',
    errors: ''
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
        this.setState({
          errors: "More characters needed"
        })
      } else {
        this.props.search(this.state.query)
        this.setState({
          errors: ''
        })
      }
    } else if ( key === 8 || key === 46 ) {
      this.setState({
        errors: ''
      })
      this.props.undo()
    }
  }

  render(){
    return(
      <div>
        {this.state.errors ?
        <p className="color-red"><strong>Not enough characters, try again</strong></p>
        : null }
        {this.props.errors ?
        <p className="color-red"><strong>No results found, try again</strong></p>
        : null }
        <form className="ui icon input">
          <input type="text" size="15" name="query" value={this.state.query} onInput={this.handleInput} onKeyDown={this.handleKeyDown} placeholder="Find New Friends"/>
          <i className="search icon"></i>
        </form>
      </div>
    )
  }
}

export default FindFriends
