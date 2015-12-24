'use strict';
import React from 'react';
import Reflux from 'reflux';
import Webcam from 'react-webcam';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AnalysisAction from '../actions/AnalysisAction';
import AnalysisStore from '../stores/AnalysisStore';

const REPEAT_INTERVAL = 5000;

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  getInitialState() {
    return {repeating: false}
  },

  onCaptureOne() {
    AnalysisAction.submit(this.refs.webcam.getScreenshot());
  },

  onCaptureRepeat() {
    AnalysisAction.submit(this.refs.webcam.getScreenshot());
    this.setState({
      repeating: setInterval(this.onCaptureOne, REPEAT_INTERVAL)
    });
  },

  onStopRepeat() {
    this.setState({repeating: false});
    clearInterval(this.state.repeating)
  },

  render() {
    return (
      <div>
        <Webcam width={320} height={240} audio={false} ref='webcam' screenshotFormat='image/jpeg'/>
        <ButtonToolbar style={{marginTop: 10}}>
          <Button bsStyle="primary" onClick={this.onCaptureOne}>Capture One</Button>
          {(() => {
            if(this.state.repeating) {
              return <Button bsStyle="warning" onClick={this.onStopRepeat}>Stop</Button>
            }
            else {
              return <Button bsStyle="success" onClick={this.onCaptureRepeat}>Every {REPEAT_INTERVAL / 1000} sec</Button>
            }
          })()}
        </ButtonToolbar>
      </div>
    )
  }
})
