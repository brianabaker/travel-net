import React from 'react'
import ReactFilestack from 'filestack-react'

const AddPhotos = (props) => {
  const basicOptions = {
    accept: 'image/*',
    fromSources: ['local_file_system'],
    maxSize: 1024 * 1024,
    maxFiles: 5,
  }

  return(
    <div style={{padding: "0"}}>
        <ReactFilestack
        apikey={"AgECQ74WESFue6arOCoOhz"}
        buttonText={"Add Photos"}
        buttonClass="ui mini button gray"
        options={basicOptions}
        onSuccess={props.onSuccess}
        onError={props.onError}
      />
    </div>
  )
}

export default AddPhotos
