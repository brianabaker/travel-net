import React from 'react'
import ReactFilestack from 'filestack-react'
import keys from '../keys.js'

const AddPhotos = (props) => {
  const basicOptions = {
    accept: 'image/*',
    fromSources: ['local_file_system'],
    maxSize: 1024 * 1024,
    imageMax: [300, 300],
    maxFiles: 5,
  }

  return(
    <div style={{padding: "0"}}>
        <ReactFilestack
        apikey={keys.filestackKey}
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
