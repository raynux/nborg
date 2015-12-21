'use strict';
import React from 'react';
import Webcam from 'react-webcam';
import {Button, Panel, Grid, Row, Col} from 'react-bootstrap';

import request from 'superagent';
require('superagent-as-promised')(request);


export default React.createClass({
  onCapture() {
    request.post('/api/analyze')
    .send({
      image: this.refs.webcam.getScreenshot(),
    })
    .then((res) => {
      console.log(res.body);
    }).catch((err) => {
      console.log(err);
    });
  },

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6}>
            <Webcam width={480} height={360} audio={false}
                    ref='webcam' screenshotFormat='image/jpeg'/>
          </Col>
          <Col xs={12} md={6}>
            <Panel>xxx</Panel>
          </Col>
        </Row>
        <Row>
          <Button bsStyle="primary" onClick={this.onCapture}>Capture</Button>
        </Row>
      </Grid>
    )
  }
})
