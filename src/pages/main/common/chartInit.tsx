import { Component } from 'react';
import * as zrender from 'zrender';
import wheel24 from "./../wheel24/wheel24";
import hexagon from "./../hexagon/hexagon";

import CanvasPainter from 'zrender/lib/canvas/Painter';
zrender.registerPainter('canvas', CanvasPainter);

export default class chart extends Component<appOption, commonOption> {
  zr: zrender.ZRenderType | null = null
  chartIns: hexagon | null = null
  width: number = 0
  height: number = 0
  chartWrapper: [number, number] = [0, 0]
  // constructor (props) {
  //   super(props)
  // }
  componentDidMount () {
    this.zr = zrender.init(document.getElementById('chart'), { renderer: 'canvas' });
    // this.chartGroup = null
    this.width = this.zr.getWidth();
    this.height = this.zr.getHeight();
    this.chartWrapper = [this.width, this.height]
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
      this.zr?.resize()
      const group = this.chartIns?.getChartGroup().getBoundingRect()

      const groupX = group?.x || 0
      const groupY = group?.y || 0
      const groupWidth = group?.width || 0
      const groupHeight = group?.height || 0
      const offsetX = (this.width - this.chartWrapper[0]) / 2

      console.log('this.width: ', this.width, 'chartWrapper[0]: ', this.chartWrapper[0], 'groupX: ', groupX, 'offsetX: ', offsetX)
      // e.offsetX - (e.offsetX - x) * k
      this.chartIns?.getChartGroup()?.attr({
        scaleX: this.props.plus,
        scaleY: this.props.plus,
        originX: groupX + groupWidth / 2,
        originY: groupY + groupHeight / 2, 
      })
      const group1 = this.chartIns?.getChartGroup().getBoundingRect()
      console.log('groupX', group1?.x)
      return
    }
    this.zr?.clear()
    this.getChart()
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
    let width = '100%'
    let height = '100%'
    const chartR = this.chartIns?.getR() || 0 
    const length = chartR * this.props.chartSize * 2 * this.props.plus + 100
    if (this.chartWrapper[0] && length > this.chartWrapper[0]) {
      width = length + 'px'
      this.width = length - 50
    }
    if (this.chartWrapper[0] && length > this.chartWrapper[1]) {
      height = length + 'px'
      this.height = length - 50
    }
    console.log('this.width: ', this.width, width, length)
    return <div id="chart" style={{ width: width, height: height }}></div>
  }
}