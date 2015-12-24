'use strict';
import React from 'react';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

import Header from './Header';
import InputCamera from './InputCamera';
import ResultList from './ResultList';
import ScatterPlot from './ScatterPlot';
import TotalDonuts from './TotalDonuts';

export default React.createClass({
  render() {
    return (
      <div>
        <Header />

        <Grid style={{marginTop: 40}}>
          <Row>
            <Col xs={12} md={4}>
              <Panel header="Input Camera"><InputCamera /></Panel>
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
