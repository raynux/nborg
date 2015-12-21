'use strict';
import Reflux from 'reflux';
import AnalysisAction from '../actions/AnalysisAction';
import uuid from 'node-uuid';

import request from 'superagent';
require('superagent-as-promised')(request);

export default Reflux.createStore({
  listenables: [AnalysisAction],

  data: [],

  submit(image) {
    request.post('/api/analyze')
    .send({ image: image })
    .then((res) => {
      this.data.push({
        id: uuid.v4(),
        // image: image,
        timestamp: new Date(),
        result: res.body
      });
      console.log(this.data);
      this.trigger(this.data);
    }).catch((err) => {
      console.log(err);
    });
  },

  init() {
  },

  getInitialState() {
    return this.data;
  }
})
