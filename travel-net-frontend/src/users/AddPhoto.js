
import React from 'react'
import ReactFilestack from 'filestack-react'

class AddPhoto extends React.Component {

  render() {
    const basicOptions = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      imageMax: [300, 300],
      maxFiles: 1,
    }

    return(
      <div>
          <ReactFilestack
          apikey={"AgECQ74WESFue6arOCoOhz"}
          buttonText={this.props.text}
          buttonClass="ui medium button gray"
          options={basicOptions}
          onSuccess={this.props.onSuccess}
          onError={this.props.onError}
        />
      </div>
    )
  }

}

export default AddPhoto
