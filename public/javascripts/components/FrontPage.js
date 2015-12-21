'use strict';
import React from 'react';
import Reflux from 'reflux';
import Webcam from 'react-webcam';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import AnalysisAction from '../actions/AnalysisAction';
import AnalysisStore from '../stores/AnalysisStore';

import ResultList from './ResultList';

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  onCapture() {
    AnalysisAction.submit(this.refs.webcam.getScreenshot());
  },

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6}>
            <Webcam width={480} height={360} audio={false}
                    ref='webcam' screenshotFormat='image/jpeg'/>
          </Col>
          <Col xs={12} md={6}><ResultList /></Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Button bsStyle="primary" onClick={this.onCapture}>Capture</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
})
