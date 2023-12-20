import { Component } from 'react';
import * as zrender from 'zrender';
import wheel24 from "./../wheel24/wheel24";
import hexagon from "./../hexagon/hexagon";
import scrollbar from './scrollbar';

import CanvasPainter from 'zrender/lib/canvas/Painter';
zrender.registerPainter('canvas', CanvasPainter);

export default class chart extends Component<appOption, commonOption> {
  zr: zrender.ZRenderType | null = null
  chartIns: hexagon | null = null
  scrollbarIns: scrollbar | null = null
  width: number = 0
  height: number = 0
  chartWrapper: [number, number] = [0, 0]
  componentDidMount () {
    this.zr = zrender.init(document.getElementById('chart'), { renderer: 'canvas' });
    this.width = this.zr.getWidth();
    this.height = this.zr.getHeight();
    this.chartWrapper = [this.width, this.height]
    this.scrollbarRender()
    this.getChart()
  }
  componentDidUpdate(prevProps: Readonly<appOption>): void {
    if (this.props.color !== prevProps.color) return
    if (this.props.clear !== prevProps.clear) {
      this.chartIns?.getTextArr().forEach(text => {
        text.attr({
          style: {
            backgroundColor: 'none'
          }
        })
      })
      return
    }
    if (this.props.plus !== prevProps.plus) {
      let scale = this.chartIns?.scale(this.props.plus) || { x: 0, y: 0 }
      if (scale.x > 0) {
        this.scrollbarIns?.setHorizontalTrumb({
          begin: (this.width - scale.x) / 2,
          length: scale.x
        })
        this.scrollbarIns?.getHorizontalGroup() && this.zr?.add(this.scrollbarIns?.getHorizontalGroup())
      }
      if (scale.y > 0) {
        this.scrollbarIns?.setVerticalTrumb({
          begin: (this.height - scale.y) / 2,
          length: scale.y
        })
        this.scrollbarIns?.getVerticalGroup() && this.zr?.add(this.scrollbarIns?.getVerticalGroup())
      }
      return
    }
  }
  scrollbarRender () {
    this.scrollbarIns = new scrollbar({
      width: this.width,
      height: this.height,
      overflow: 'both',
      ratioX: 1,
      ratioY: 1
    })
  }
  getChart () {
    switch (this.props.currentChartType) {
      case 'wheel24':
        this.zr?.add(this.wheel24Render({
          width: this.width,
          height: this.height,
          beginValue: this.props.beginValue,
          step: this.props.step,
          chartSize: this.props.chartSize
        }))
        break
      case 'hexagon':
        this.chartIns = new hexagon({
          zr: this.zr,
          width: this.width,
          height: this.height,
          beginValue: this.props.beginValue,
          step: this.props.step,
          chartSize: this.props.chartSize,
          clear: this.props.clear,
          getBg: () => this.props.color,
          getPlus: () => this.props.plus
        })
        this.zr?.add(this.chartIns?.getChartGroup())
    }
  }
  wheel24Render ({ width, height, beginValue, step = 1, chartSize = 5 }: chartOption) {
    return wheel24({ width, height, beginValue, step, chartSize })
  }
  render () {
    return <div id="chart" style={{ width: '100%', height: '100%' }}></div>
  }
}