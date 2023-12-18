import { Group, Line, Text, Polyline, Rect } from 'zrender'

export default class hexagon {
  chartGroup: Group = new Group()
  shapeGroup: Group = new Group()
  valueGroup: Group = new Group()
  valueArr: Text[] = []
  lineGroup: Group = new Group()
  lineArr1: Line[] = []
  lineArr2: Line[] = []
  block: Rect = new Rect()
  centerX: number = 0
  centerY: number = 0
  r: number = 0
  props
  constructor (props: chartOption) {
    this.centerX = props.width / 2
    this.centerY = props.height / 2
    this.props = props
    const { chartSize } = this.props
    this.r = (this.centerY - 50 - 8) / chartSize < 20 ? 20 : (this.centerY - 50 - 8) / chartSize
    this.init()
  }

  init () {
    this.shapeGroup.add(
      new Rect({
        shape: {
          x: this.centerX - 50,
          y: this.centerY - 50,
          width: 100,
          height: 100
        },
        style: {
          fill: '#00ff00'
        }
      })
    )
    this.chartGroup.add(this.shapeGroup)
    this.chartGroup.add(this.valueGroup)
    this.chartGroup.add(this.lineGroup)
  }

  getChartGroup () {
    return this.chartGroup
  }
  getTextArr () {
    return this.valueArr
  }
  getR () {
    return 50 * (this.props?.getPlus() || 1)
  }
}