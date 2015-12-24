'use strict';
import React from 'react';
import Reflux from 'reflux';
import Webcam from 'react-webcam';
import {Button, Panel, Grid, Row, Col} from 'react-bootstrap';
import AnalysisAction from '../actions/AnalysisAction';
import AnalysisStore from '../stores/AnalysisStore';

import Header from './Header';
import ResultList from './ResultList';
import ScatterPlot from './ScatterPlot';
import TotalDonuts from './TotalDonuts';

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  onCapture() {
    AnalysisAction.submit(this.refs.webcam.getScreenshot());
  },

  render() {
    return (
      <div>
        <Header />

        <Grid style={{marginTop: 40}}>
          <Row>
            <Col xs={12} md={4}>
              <Panel header="Input Camera">
                <Webcam width={320} height={240} audio={false} ref='webcam' screenshotFormat='image/jpeg'/>
                <div style={{marginTop: 10}}>
                  <Button bsStyle="primary" onClick={this.onCapture}>Capture</Button>
                </div>
              </Panel>
            </Col>
            <Col xs={12} md={4}>
              <Panel header="Donuts"><TotalDonuts /></Panel>
            </Col>
            <Col xs={12} md={4}>
              <Panel header="Scatter Plot"><ScatterPlot /></Panel>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Panel header="Result"><ResultList /></Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
})
