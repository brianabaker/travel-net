import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import React from 'react'

const EndTripConfirmation = (props) => {
  const submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to end this trip?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.endTrip()
        },
        {
          label: 'No'
        }
      ]
    })
  };

  return(
    <a onClick={() => submit()}>End Trip</a>
  )
}

export default EndTripConfirmation
