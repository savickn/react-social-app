
import React from 'react';

import Upload from '../Upload/upload';

class PictureTestPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      _id: '23423423423', 
    };
  }

  upload = (formData) => {
    //formData.append('imageableType', 'Group');
    //formData.append('album', this.state._id);
    //formData.append('displayPicture', true);

    if(typeof window != undefined) {
      const fr = new FileReader();
      const files = [];
      for(let x of formData.values()) {
        console.log(x);
        files.push(x);
      }

      fr.addEventListener('load', () => {
        console.log('dataurl --> ', fr.result);
        this.setState({altImg: fr.result});
      });
      fr.readAsDataURL(files[0]);
    }

    axios.post('/api/pictures/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  
  render() {
    return (
      <div>
        <Upload handleUpload={this.upload} />
      </div>
    );
  }
}

export default PictureTestPage;
