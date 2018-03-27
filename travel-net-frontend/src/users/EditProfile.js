
import React from 'react'
import {connect} from 'react-redux'
import AddPhoto from './AddPhoto'

// import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
// import _ from 'lodash'
import {editUser} from '../actions/users'

class EditProfile extends React.Component {

  state = {
    username: '',
    bio: '',
    picture: '',
    changes: '',
    url: ''
  }

  componentDidMount() {
    let id = this.props.currentUser.id
      fetch(`http://localhost:3000/users/${id}`)
      .then(res => res.json())
      .then(profileJSON => {
        console.log(profileJSON)
        this.setState({
          username: profileJSON.username,
          bio: profileJSON.bio,
          url: profileJSON.profile_pic_url
        })
      })
  }

    onSuccess = (result) => {
      this.setState({
        url: result.filesUploaded[0].url
      }, () => console.log(this.state.url))
    }
    onError = (error) => {
      console.error('error', error);
    }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit = () => {
    this.props.editUser(this.props.currentUser, this.state.username, this.state.bio, this.state.url)
  }

  render() {

    return(
      <div className="ui stackable grid container" id="add-padding">
        <React.Fragment>
        {this.props.alert ? (
          <div className="ui positive message">
            {this.props.alert.message}
          </div>)
          : null}
          {this.props.isLoading ? "Loading" :
            <React.Fragment>
              <div className="two column row">
              <div className="column">
               <button className="ui green button" onClick={() => this.handleEdit()}>Finish Editing Profile</button>
              </div>
            </div>
            <div className="seven wide column">
              <div className="ui form">
                <h4>Username</h4>
                <input value={this.state.username} name="username" onInput={this.handleInput} />
                  <h4>Bio</h4>
                <textarea value={this.state.bio} name="bio" onInput={this.handleInput}></textarea>
              </div>
              <div id="add-padding">
                <AddPhoto text="Change Profile Picture" onError={this.onError} onSuccess={this.onSuccess}/>
              </div>
            </div>
            <div className="eight wide column"></div>
            </React.Fragment>
          }
          </React.Fragment>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {editUser})(EditProfile)
