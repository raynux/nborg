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
    type: 'scatter',
    zoomType: 'xy'
  },
  title: {
    text: 'Age and Gender'
  },
  xAxis: {
    title: {
      enabled: true,
      text: 'Period'
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true,
    allowDecimals: false,
    min: 1
  },
  yAxis: {
    title: {
      text: 'Age'
    }
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.y} yo / period {point.x}'
      }
    }
  },
  series: [
    {
      name: 'Female',
      color: 'rgba(223, 83, 83, .5)',
      data: []
    },
    {
      name: 'Male',
      color: 'rgba(119, 152, 191, .5)',
      data: []
    }
  ]
};

export default React.createClass({
  mixins: [Reflux.connect(AnalysisStore, 'analysis')],

  convertToSeriesData(gender) {
    const data = [];
    _.forEach(this.state.analysis, (e, period) => {
      data.push(
        _(e.result)
        .filter((r) => { return _.isEqual(r.faceAttributes.gender, gender) })
        .map((r) => { return [period + 1, r.faceAttributes.age] })
        .value()
      )
    });

    return _.flatten(data);
  },

  render() {
    chartConfig.series[0].data = this.convertToSeriesData('female');
    chartConfig.series[1].data = this.convertToSeriesData('male');

    return (
      <ReactHighCharts config={chartConfig} />
    )
  }
})
