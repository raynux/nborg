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
      <div>{f.gender} {f.age} years old ({f.smile})</div>
    )
  }
});

const PictureSummary = React.createClass({
  render() {
    return (
      <Panel>
        <strong>
          {moment(this.props.item.timestamp).format('YYYY-MM-DD HH:mm:SS')}
        </strong> : {this.props.item.result.length} people

        {_(this.props.item.result).map((r, i) => {
          return (
            <PictureDetail key={`${this.props.item.id}-${i}`}
                           face={r} />
          )
        }).value()}
      </Panel>
    )
  }
});

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  render() {
    return (
      <div>
        {_(this.state.analysis).map((e) => {
          return (<PictureSummary key={e.id} item={e} />)
        }).value()}
      </div>
    )
  }
})
