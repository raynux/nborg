'use strict';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Reflux from 'reflux';
import {Panel} from 'react-bootstrap';
import AnalysisAction from '../actions/AnalysisAction';
import AnalysisStore from '../stores/AnalysisStore';

const PictureDetail = React.createClass({
  render() {
    const f = this.props.face.faceAttributes;
    return (
      <span>[ {f.gender}, {f.age} ] </span>
    )
  }
});

const PictureSummary = React.createClass({
  render() {
    return (
      <div style={{color: '#aaa'}}>
        <span> {moment(this.props.item.timestamp).format('YYYY-MM-DD HH:mm:SS')} - {this.props.item.result.length} : </span>

        {_(this.props.item.result).map((r, i) => {
          return (
            <PictureDetail key={`${this.props.item.id}-${i}`}
                           face={r} />
          )
        }).value()}
      </div>
    )
  }
});

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  render() {
    return (
      <div>
        {_(this.state.analysis).reverse().map((e) => {
          return (<PictureSummary key={e.id} item={e} />)
        }).value()}
      </div>
    )
  }
})
