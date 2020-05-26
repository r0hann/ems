import React, { Component } from 'react';
import '../../css/upload.css';

class UploadFile extends Component {
  state = {
    selectedFile: null,
    loaded: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  render() {
    const { onChooseFile, selectedFile } = this.props;
    return (
      <React.Fragment>
        <br />
        <br />
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            value={selectedFile ? selectedFile.name : ''}
            readOnly
          />
          <div className='input-group-btn'>
            <span className='fileUpload btn btn-success'>
              <span className='upl' id='upload'>
                Choose File
              </span>
              <input
                type='file'
                className='upload up'
                id='up'
                onChange={onChooseFile}
              />
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UploadFile;
