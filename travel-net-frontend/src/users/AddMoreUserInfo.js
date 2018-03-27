import React from 'react'
import AddPhoto from './AddPhoto'
import {connect} from 'react-redux'
import {addBio} from '../actions/users'
class AddMoreUserInfo extends React.Component {
  state = {
    bio: '',
    url: ''
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitInfo = (e) => {
    e.preventDefault()
    console.log(this.props)
    this.props.addBio(this.props.currentUser, this.state.bio,  this.state.url)
  }

  onSuccess = (result) => {
    this.setState({
      url: result.filesUploaded[0].url
    }, () => console.log(this.state.url))
  }
  onError = (error) => {
    console.error('error', error);
  }

  render() {
    return(
      <div>
        <p>Welcome to Travel Net the best Travel Network!</p>
        <div className="App">
          <form className="ui form" onSubmit={this.submitInfo}>
            <label>
              Tell Us More About Yourself!
              <textarea value={this.state.bio} name="bio" onInput={this.handleInput}></textarea>
            </label>
          <div>
            <AddPhoto text="Upload Profile Photo" onError={this.onError} onSuccess={this.onSuccess}/>
          </div>
          <input type="submit"/>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {addBio})(AddMoreUserInfo)
