
import React from 'react'
import Popup from "reactjs-popup";

const AskUserWhereTheyLiveAfterTrip = (props) => {
  console.log('in the popup', props)
  return(
    <Popup
        >
          <div className="modal">
            <a className="close" onClick={props.closeModal}>
              &times;
            </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
            omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
            ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
            doloribus. Odit, aut.
          </div>
    </Popup>
  )
}

export default AskUserWhereTheyLiveAfterTrip
