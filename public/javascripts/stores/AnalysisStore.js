'use strict';
import Reflux from 'reflux';
import AnalysisAction from '../actions/AnalysisAction';

export default Reflux.createStore({
  listenables: [AnalysisAction],

  data: {
    // datasets: []
  },

  init() {
    // this.getModels();
  },

  getInitialState() {
    return this.data;
  }
})
