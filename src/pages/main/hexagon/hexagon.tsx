import { Group, Line, Text, Polyline, Rect } from 'zrender'

export default class hexagon {
  chartGroup: Group
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
    // this.r = (this.centerY - 50 - 8) / chartSize < 20 ? 20 : (this.centerY - 50 - 8) / chartSize
    this.r = this.centerY / chartSize < 20 ? 20 : this.centerY / chartSize

    this.chartGroup = new Group({
      x: 0,
      y: 0,
      originX: this.centerX,
      originY: this.centerY,
      scaleX: 1,
      scaleY: 1
    })
    this.init()
    document.addEventListener('moveX', this.moveXHandler.bind(this))
    document.addEventListener('moveY', this.moveYHandler.bind(this))
  }

  init () {
    this.renderShapeAndValue()
    this.renderLine()
    this.chartGroup.add(this.shapeGroup)
    this.chartGroup.add(this.valueGroup)
    this.chartGroup.add(this.lineGroup)
  }

  renderShapeAndValue () { // 六边形、文本
    const radian = 2 * Math.PI / 360 * 60
    const {chartSize } = this.props
    let value = this.props.beginValue
    for (let i = 0; i < chartSize; i++) {
      const circleR = (i + 1) * this.r
      this.shapeGroup.add(
        new Polyline({
          shape: {
            points: [
              [this.centerX - circleR, this.centerY],
              [this.centerX - circleR * Math.cos(radian), this.centerY - circleR * Math.sin(radian)],
              [this.centerX + circleR * Math.cos(radian), this.centerY - circleR * Math.sin(radian)],
              [this.centerX + circleR, this.centerY],
              [this.centerX + circleR * Math.cos(radian), this.centerY + circleR * Math.sin(radian)],
              [this.centerX - circleR * Math.cos(radian), this.centerY + circleR * Math.sin(radian)],
              [this.centerX - circleR, this.centerY]
            ] 
          },
          style: {
            fill: 'none',
            stroke: '#666666'
          }
        })
      )
      const valueR = circleR - this.r / 2
      const valueNum = 6 * (i + 1)
      for (let j = 1; j <= valueNum; j++) { // 文本
        let angle = 360 / valueNum * j
        if (angle > 60 && angle < 120) {
          angle = 60
        } else if (angle > 240 && angle < 300) {
          angle = 240
        }
        const valueRadianX = 2 * Math.PI / 360 * (360 / valueNum * j)
        const valueRadianY = 2 * Math.PI / 360 * angle
        let offsetX = valueR * Math.cos(valueRadianX)
        let offsetY = valueR * Math.sin(valueRadianY)
        const num = valueNum / 6 // 6等分, 每条边有几个数
        if (angle < 60) {
          offsetX = valueR - valueR / num * j * Math.cos(2 * Math.PI / 360 * 60)
          offsetY = valueR / num * j * Math.sin(2 * Math.PI / 360 * 60)
        } else if (angle > 120 && angle < 180) {
          const ratio = j - num * 2 // 第3条边开始
          offsetX = -(valueR - (valueR - valueR / num * ratio) * Math.cos(2 * Math.PI / 360 * 60))
          offsetY = (valueR - valueR / num * ratio) * Math.sin(2 * Math.PI / 360 * 60)
        } else if (angle > 180 && angle < 240) {
          const ratio = j - num * 3 // 第4条边
          offsetX = -(valueR - valueR / num * ratio * Math.cos(2 * Math.PI / 360 * 60))
          offsetY = -(valueR / num * ratio * Math.sin(2 * Math.PI / 360 * 60))
        } else if (angle > 300 && angle < 360) {
          const ratio = j - num * 5 // 第6条边
          offsetX = valueR - (valueR - valueR / num * ratio) * Math.cos(2 * Math.PI / 360 * 60)
          offsetY = -((valueR - valueR / num * ratio) * Math.sin(2 * Math.PI / 360 * 60))
        }
        const text = new Text({
          x: this.centerX + offsetX,
          y: this.centerY - offsetY,
          style: {
            text: '' + value,
            align: 'center',
            verticalAlign: 'middle',
            fill: (valueNum - j) % num === 0 ? '#ff0000' : (valueNum - (j + num / 2)) % num === 0 ? '#0000ff' : '#333333'
          }
        })
        this.valueGroup.add(text)
        this.valueArr.push(text)
        text.on('click', () => {
          const color = this.props.getBg()
          text.attr({
            style: {
              backgroundColor: color
            }
          })
        })
        value = value + this.props.step
      }
    }
  }

  renderLine () {
    for (let i = 0; i < 6; i++) {
     this.lineArr1[i] = new Line({
        style:{
          stroke: i % 2 === 0 ? '#ff0000' : '#0000ff',
        },
        shape:{
          x1 : this.centerX,
          y1 : this.centerY,
          x2 : this.centerX + this.r * this.props.chartSize * Math.cos(2 * Math.PI / 360 * 60 * i),
          y2 : this.centerY - this.r * this.props.chartSize * Math.sin(2 * Math.PI / 360 * 60 * i)
        }
      })
      this.lineGroup.add(this.lineArr1[i])
  
      this.lineArr2[i] = new Line({
        style:{
          stroke: '#999999',
          lineDash: [3, 1]
        },
        shape:{
          x1 : this.centerX,
          y1 : this.centerY,
          x2 : this.centerX + this.r * this.props.chartSize * Math.cos(2 * Math.PI / 360 * (30 + (i * 60))),
          y2 : this.centerY - this.r * this.props.chartSize * Math.sin(2 * Math.PI / 360 * (30 + (i * 60)))
        }
      })
      this.lineGroup.add(this.lineArr2[i])
    }
    this.block = new Rect({
      shape: {
        x: this.centerX + this.r * this.props.chartSize - 5,
        y: this.centerY - 4,
        width: 10,
        height: 8
      },
      style: {
        fill: 'none',
        stroke: '#ff0000'
      }
    })
  
    
    const handler = this.moveHandler.bind(this)
    this.block.on('mousedown', () => {
      window.addEventListener('mousemove', handler)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', handler, false)
      })
    })
  
    this.block.on('mouseup', () => {
      window.removeEventListener('mousemove', handler, false)
    })
    
    this.lineGroup.add(this.block)
  }
  moveHandler (event: MouseEvent) {
    const x = event.offsetX - this.centerX;
    const y = event.offsetY - this.centerY;
    const angle = Math.atan2(y, x)
    const length = Math.sqrt(x * x + y * y)
    this.rerenderLine(angle, length)
  }

  rerenderLine (angle: number, length: number) {
    this.lineArr1.forEach((line, i) => {
      line.attr({
        shape: {
          x2 : this.centerX + length * Math.cos(2 * Math.PI / 360 * 60 * i - angle),
          y2 : this.centerY - length * Math.sin(2 * Math.PI / 360 * 60 * i - angle)
        }
      })
    })
    this.lineArr2.forEach((line, i) => {
      line.attr({
        shape: {
          x2 : this.centerX + length * Math.cos(2 * Math.PI / 360 * (30 + (i * 60)) - angle),
          y2 : this.centerY - length * Math.sin(2 * Math.PI / 360 * (30 + (i * 60)) - angle)
        }
      })
    })
    this.block.attr({
      shape: {
        x : this.centerX + length * Math.cos(-angle),
        y : this.centerY - length * Math.sin(-angle)
      }
    })
  }

  getChartGroup () {
    return this.chartGroup
  }
  getTextArr () {
    return this.valueArr
  }
  getR () {
    return this.r
  }

  scale (plus: number): {x : number, y: number} {
    const group = this.chartGroup.getBoundingRect()

    const groupX = group?.x || 0
    const groupY = group?.y || 0
    const groupWidth = group?.width || 0
    const groupHeight = group?.height || 0
    this.chartGroup.attr({
      scaleX: plus,
      scaleY: plus,
      originX: groupX + groupWidth / 2,
      originY: groupY + groupHeight / 2,
    })
    const scale = {
      x: 0,
      y: 0
    }
    const length = this.r * this.props.chartSize * 2 * plus
    if (length > this.props.width) {
      scale.x = this.props.width * this.props.width / length
    }
    if (length > this.props.height) {
      scale.y = this.props.height * this.props.height / length
    }
    return scale
  }
  moveXHandler (e: MouseEvent) {
    const { movement } = e.detail
    console.log('moveXHandler', e.detail)
    this.chartGroup.attr({
      originX: this.chartGroup.originX + movement
    })
  }
  moveYHandler (e: MouseEvent) {
    const { movement } = e.detail
    console.log('moveXHandler', e.detail)
    this.chartGroup.attr({
      originY: this.chartGroup.originY + movement
    })
  }
}