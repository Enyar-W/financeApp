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
  componentDidMount() {
    this.init()
    window.addEventListener('resize', () => {
      this.init()
    })
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
      this.scaleHandler()
      return
    }
    if (this.props.fontSize !== prevProps.fontSize) {
      this.chartIns?.getTextArr().forEach(text => {
        text.attr({
          style: {
            fontSize: this.props.fontSize || 12
          }
        })
      })
      return
    }
    if (this.props.theme[0] !== prevProps.theme[0]) {
      const el = document.getElementById('chart') || null;
      el && (el.style.background = this.props.theme[0]);

      this.chartIns?.getShapeArr().forEach(shape => {
        shape.attr({
          style: {
            stroke: this.props.theme[1]
          }
        })
      })
      this.chartIns?.getTextArr().forEach(text => {
        text.attr({
          style: {
            fill: ['#ff0000', '#0000ff'].includes(text.style.fill) ? text.style.fill : this.props.theme[1]
          }
        })
      })
      return;
    }
    this.zr?.clear()
    this.getChart()
    this.scrollbarRender()
  }
  init() {
    this.zr = zrender.init(document.getElementById('chart'), { renderer: 'canvas' });
    this.width = this.zr.getWidth();
    this.height = this.zr.getHeight();
    this.chartWrapper = [this.width, this.height]
    this.getChart()
    this.scrollbarRender()
  }

  scrollbarRender() {
    this.scrollbarIns = new scrollbar({
      width: this.width,
      height: this.height,
      overflow: 'both',
      ratioX: 1,
      ratioY: 1
    })
    this.scaleHandler()
  }
  scaleHandler() {
    let scale = this.chartIns?.scaleHandler(this.props.plus) || { x: 0, y: 0 }
    if (scale.x > 0) {
      this.scrollbarIns?.setHorizontalTrumb({
        begin: (this.width - scale.x) / 2,
        length: scale.x
      })
      this.scrollbarIns?.getHorizontalGroup() && this.zr?.add(this.scrollbarIns?.getHorizontalGroup())
    } else {
      this.scrollbarIns?.getHorizontalGroup() && this.zr?.remove(this.scrollbarIns?.getHorizontalGroup())
    }
    if (scale.y > 0) {
      this.scrollbarIns?.setVerticalTrumb({
        begin: (this.height - scale.y) / 2,
        length: scale.y
      })
      this.scrollbarIns?.getVerticalGroup() && this.zr?.add(this.scrollbarIns?.getVerticalGroup())
    } else {
      this.scrollbarIns?.getVerticalGroup() && this.zr?.remove(this.scrollbarIns?.getVerticalGroup())
    }
  }
  getChart() {
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
          theme: this.props.theme,
          getBg: () => this.props.color,
          getPlus: () => this.props.plus,
          getFontSize: () => this.props.fontSize
        })
        this.zr?.add(this.chartIns?.getChartGroup())
    }
  }
  wheel24Render({ width, height, beginValue, step = 1, chartSize = 5 }: chartOption) {
    return wheel24({ width, height, beginValue, step, chartSize })
  }
  render() {
    return <div id="chart" style={{ width: '100%', height: '100%', background: '#C7EDCC' }}></div>
  }
}