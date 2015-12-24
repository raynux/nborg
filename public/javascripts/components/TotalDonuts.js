'use strict';
import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import AnalysisStore from '../stores/AnalysisStore';
import ReactHighCharts from 'react-highcharts/dist/bundle/highcharts';
import HighChartsTheme from '../highcharts/theme';

ReactHighCharts.Highcharts.setOptions(HighChartsTheme);

const chartConfig = {
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Age'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      showInLegend: true,
      animation: false
    }
  },
  series: [
    {
      name: 'Count',
      size: '60%',
      data: []
    }
  ]
};


const COLOR_TABLE = {
  'Under 20': '#AA4643',
  '20-29': '#4572A7',
  '30-39': '#00bc8c',
  '40-49': '#80699B',
  '50-59': '#89A54E',
  'Over 60': '#DB843D'
}

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  convertToSeriesData(gender) {
    return _.chain(this.state.analysis)
      .map((e) => { return e.result })
      .flatten()
      .map((r) => {
        const age = r.faceAttributes.age;
        if(age < 20)      { return 'Under 20' }
        else if(age < 30) { return '20-29' }
        else if(age < 40) { return '30-39' }
        else if(age < 50) { return '40-49' }
        else if(age < 60) { return '50-59' }
        else              { return 'Over 60' }
      })
      .reduce((count, ageCategory) => {
        count[ageCategory] = _.add(count[ageCategory], 1);
        return count;
      }, {})
      .pairs()  // convert to [[category, count], [category, count], ...]
      .map((stat) => {

        return {name: stat[0], y: stat[1], color: COLOR_TABLE[stat[0]]}
      })
      .value()
  },

  render() {
    chartConfig.series[0].data = this.convertToSeriesData();

    return (
      <ReactHighCharts config={chartConfig} />
    )
  }
})
