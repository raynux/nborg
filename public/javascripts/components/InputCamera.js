'use strict';
import React from 'react';
import Reflux from 'reflux';
import Webcam from 'react-webcam';
import {Button} from 'react-bootstrap';
import AnalysisAction from '../actions/AnalysisAction';
import AnalysisStore from '../stores/AnalysisStore';

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  onCapture() {
    AnalysisAction.submit(this.refs.webcam.getScreenshot());
  },

  render() {
    return (
      <div>
        <Webcam width={320} height={240} audio={false} ref='webcam' screenshotFormat='image/jpeg'/>
        <div style={{marginTop: 10}}>
          <Button bsStyle="primary" onClick={this.onCapture}>Capture</Button>
        </div>
      </div>
    )
  }
})
