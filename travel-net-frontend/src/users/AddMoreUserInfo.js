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
        {this.props.currentUser ?
          <React.Fragment>
            <p>Welcome to Travel Net the best Travel Network!</p>
              <form className="ui form" onSubmit={this.submitInfo}>
                <label>
                  Tell Us More About Yourself!
                  <div>
                    <textarea className="eight wide field" value={this.state.bio} name="bio" onInput={this.handleInput}></textarea>
                  </div>
                </label>
              <div>
                <AddPhoto text="Upload Profile Photo" onError={this.onError} onSuccess={this.onSuccess}/>
              </div><br/><br/>
            <input type="submit" className="ui button green"/>
            </form>
          </React.Fragment>
        : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {addBio})(AddMoreUserInfo)
