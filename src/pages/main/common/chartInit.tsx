import { Component } from 'react';
import * as zrender from 'zrender';
import wheel24 from "./../wheel24/wheel24";
import hexagon from "./../hexagon/hexagon";
export default class chart extends Component<appOption, commonOption> {
  zr: zrender.ZRenderType | null
  chartIns: hexagon | null = null
  width: number
  height: number
  chartWrapper: [number, number] = [0, 0]
  constructor (props) {
    super(props)
    this.zr = null
    this.width = 0
    this.height = 0
  }
  componentDidMount () {
    this.zr = zrender.init(document.getElementById('chart'), { renderer: 'canvas' });
    // this.chartGroup = null
    this.width = this.zr.getWidth();
    this.height = this.zr.getHeight();
    this.chartWrapper = [this.width, this.height]
    this.getChart()
  }
  componentDidUpdate(prevProps: Readonly<appOption>, prevState: Readonly<commonOption>, snapshot?: any): void {
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
      this.width = this.zr?.getWidth() || 0;
      this.height = this.zr?.getHeight() || 0;
      const group = this.chartIns?.getChartGroup().getBoundingRect()
      console.log('group', group?.x, group?.y, group?.width, group?.height)
     
      // let originX = (group?.x || 0) + (group?.width || 0) / 2 + (this.width - this.chartWrapper[0]) / 2
      // let originY = (group?.y || 0) + (group?.height || 0) / 2 + (this.height - this.chartWrapper[1]) / 2
      let originX = this.width / 2 
      let originY = this.height / 2
      if (this.chartWrapper[0] >= this.width) {
        originX = this.chartWrapper[0] / 2
      }
      if (this.chartWrapper[1] >= this.height) {
        originY = this.chartWrapper[1] / 2
      }
      // console.log(originX, originY)
      this.chartIns?.getChartGroup()?.attr({
        scaleX: this.props.plus,
        scaleY: this.props.plus,
        x: 0,
        y: 0
        // x: ((group?.x || 0) - (group?.width || 0) * this.props.plus) / 2,
        // y: ((group?.y || 0) - (group?.height || 0) * this.props.plus) / 2
        // originX: ((group?.x || 0) + ((group?.width || 0) * this.props.plus) / 2),
        // originY: ((group?.y || 0) + ((group?.height || 0) * this.props.plus) / 2)
      })
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
    const length = chartR * this.props.chartSize * 2 * this.props.plus
    if (length > this.chartWrapper[0]) {
      width = length + 'px' 
    }
    if (length > this.chartWrapper[1]) {
      height = length + 'px'
    }
    return <div id="chart" style={{ width: width, height: height }}></div>
  }
}