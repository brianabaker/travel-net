
import React from 'react'


// const sameUse
const RenderButton = (props) => {

  return(
    <div>
      <button className="ui small blue button" onClick={props.function}>{props.text}</button>
    </div>
  )
}

export default RenderButton

// {!this.props.sameUser ?
//     <React.Fragment>
//       {this.checkFriendship() === true ? "Button to remove friend here" :
//         <button onClick={() => this.requestFriendship()}>Add Friend</button>
//       }
