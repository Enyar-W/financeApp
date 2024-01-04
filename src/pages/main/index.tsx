import './index.css'
import { Component } from "react";

import Chart from "./common/chartInit";
import squal9 from "./squal/squal";
import master from "./master/master"
class Main extends Component<appOption> {
  squalRender() {
    const squal9Ins = squal9({
      beginValue: this.props.beginValue,
      step: this.props.step,
      chartSize: this.props.chartSize
    })
    return squal9Ins
  }

  masterRender() {
    const masterIns = master({
      beginValue: this.props.beginValue,
      step: this.props.step,
      chartSize: this.props.chartSize
    })
    return masterIns
  }

  render() {
    if (['squal9'].includes(this.props.currentChartType)) {
      return (
        <div className="content">
          {this.squalRender()}
        </div>
      )
    } else if ('master' === this.props.currentChartType) {
      return (
        <div className="content">
          {this.masterRender()}
        </div>
      )
    } else if (['wheel24', 'hexagon'].includes(this.props.currentChartType)) {
      return (
        <div className="chartWrapper">
          <Chart
            currentChartType={this.props.currentChartType}
            beginValue={this.props.beginValue}
            step={this.props.step}
            chartSize={this.props.chartSize}
            plus={this.props.plus}
            color={this.props.color}
            clear={this.props.clear}
            fontSize={this.props.fontSize}
            bg={this.props.bg}
          ></Chart>
        </div>
      )
    }
  }
}
export default Main