import { Group, Line, Text, Polyline, Rect } from 'zrender'

export default class hexagon {
  chartGroup: Group
  shapeGroup: Group = new Group()
  shapeArr: Polyline[] = []
  textGroup: Group = new Group()
  textArr: Text[] = []
  dateGroup: Group = new Group()
  dateArr: Text[] = []
  lineGroup: Group = new Group()
  lineArr1: Line[] = []
  block: Rect = new Rect()
  centerX: number = 0
  centerY: number = 0
  r: number = 0
  plus = 1
  scale = {
    x: 0,
    y: 0
  }
  props
  constructor(props: chartOption) {
    this.centerX = props.width / 2
    this.centerY = props.height / 2
    this.props = props
    this.r = 50

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

  init() {
    this.renderLine()
    this.renderShapeAndValue()
    this.chartGroup.add(this.shapeGroup)
    this.chartGroup.add(this.textGroup)
    this.chartGroup.add(this.lineGroup)
    this.props.showDate() && this.chartGroup.add(this.dateGroup)
  }

  renderShapeAndValue() { // 六边形、文本
    const radian = 2 * Math.PI / 360 * 60
    const beginDate = new Date(this.props.beginDate).getTime()
    const { chartSize } = this.props
    let value = this.props.beginValue
    for (let i = 0; i < chartSize; i++) {
      const circleR = (i + 1) * this.r
      const polyline = new Polyline({
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
          stroke: this.props.theme[1]
        }
      })
      this.shapeGroup.add(polyline)
      this.shapeArr.push(polyline)
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
        const date = new Date(beginDate + (value - 1) * 24 * 60 * 60 * 1000)
        const dateStr = (date.getMonth() + 1) + '/' + date.getDate()
        const textGroup = new Group()
        const offsetY1 = this.props.getFontSize() / 2
        const text = new Text({
          z: 100,
          x: this.centerX + offsetX,
          y: this.centerY - offsetY - (this.props.showDate() ? offsetY1 : 0),
          style: {
            text: '' + value,
            align: 'center',
            verticalAlign: 'middle',
            fill: (valueNum - j) % num === 0 ? '#ff0000' : (valueNum - (j + num / 2)) % num === 0 ? '#0000ff' : this.props.theme[1],
            fontSize: this.props.getFontSize(),
            borderWidth: 1,
            padding: [2, 0, 0, 0],
          }
        })
        const dateEl = new Text({
          z: 100,
          x: this.centerX + offsetX,
          y: this.centerY - offsetY + offsetY1,
          style: {
            text: '' + dateStr,
            align: 'center',
            verticalAlign: 'middle',
            fill: (valueNum - j) % num === 0 ? '#ff0000' : (valueNum - (j + num / 2)) % num === 0 ? '#0000ff' : this.props.theme[1],
            fontSize: this.props.getFontSize(),
            borderWidth: 1,
            padding: [2, 0, 0, 0],
          }
        })
        textGroup.add(text)
        this.textGroup.add(text)
        this.textArr.push(text)
        textGroup.add(dateEl)
        this.dateGroup.add(dateEl)
        this.dateArr.push(dateEl)

        text.on('click', () => {
          text.attr({
            style: {
              backgroundColor: text.style.backgroundColor ? '' : this.props.getBg(),
            }
          })
          dateEl.attr({
            style: {
              backgroundColor: dateEl.style.backgroundColor ? '' : this.props.getBg(),
            }
          })
        })
        dateEl.on('click', () => {
          text.attr({
            style: {
              backgroundColor: text.style.backgroundColor ? '' : this.props.getBg(),
            }
          })
          dateEl.attr({
            style: {
              backgroundColor: dateEl.style.backgroundColor ? '' : this.props.getBg(),
            }
          })
        })
        
        value = value + this.props.step
      }
    }
  }

  renderLine() {
    const colors = ['#ff0000', '#0000ff', '#999999', '#ff0000', '#0000ff', '#999999']
    const length = this.r * this.props.chartSize + 10
    for (let i = 0; i < 6; i++) {
      const angleX = length * Math.cos(2 * Math.PI / 360 * 30 * i)
      const angleY = length * Math.sin(2 * Math.PI / 360 * 30 * i)
      this.lineArr1[i] = new Line({
        style: {
          stroke: colors[i],
          lineDash: i === 2 || i === 5 ? [3, 1] : []
        },
        shape: {
          x1: this.centerX - angleX,
          y1: this.centerY + angleY,
          x2: this.centerX + angleX,
          y2: this.centerY - angleY,
        },
        originX: this.centerX,
        originY: this.centerY
      })
      this.lineGroup.add(this.lineArr1[i])
    }
    this.block = new Rect({
      z: 1000,
      shape: {
        x: this.centerX + length - 5,
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
    this.lineArr1[0].on('mousedown', () => {
      window.addEventListener('mousemove', handler)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', handler, false)
      })
    })
    this.lineArr1[0].on('mouseup', () => {
      window.removeEventListener('mousemove', handler, false)
    })
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
  moveHandler(event: MouseEvent) {
    const x = event.offsetX - this.centerX;
    const y = event.offsetY - this.centerY;
    const angle = Math.atan2(y, x)
    const length = Math.sqrt(x * x + y * y)
    this.rerenderLine(angle, length)
  }

  rerenderLine(angle: number, length: number) {
    length = this.r * this.props.chartSize + 10
    this.lineArr1.forEach((line, i) => {
      const angleX = length * Math.cos(2 * Math.PI / 360 * 30 * i - angle)
      const angleY = length * Math.sin(2 * Math.PI / 360 * 30 * i - angle)
      line.attr({
        shape: {
          x1: this.centerX - angleX,
          y1: this.centerY + angleY,
          x2: this.centerX + angleX,
          y2: this.centerY - angleY,
        }
      })
    })
    let offsetX = 0
    let offsetY = 0
    if (angle < -1.5) {
      offsetX = -5
      offsetY = -4
    }
    this.block.attr({
      shape: {
        x: this.centerX + length * Math.cos(-angle) + offsetX,
        y: this.centerY - length * Math.sin(-angle) + offsetY
      }
    })
  }
  getChartGroup() {
    return this.chartGroup
  }
  getTextGroup() {
    return this.textGroup
  }
  getTextArr() {
    return this.textArr
  }
  getDateArr() {
    return this.dateArr
  }
  getShapeArr() {
    return this.shapeArr
  }
  getR() {
    return this.r
  }

  scaleHandler(plus: number): { x: number, y: number } {
    this.plus = plus
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

    const length = groupWidth * plus
    if (length > this.props.width) {
      this.scale.x = this.props.width * this.props.width / length // 横向滚动条滑块的长度
    } else {
      this.scale.x = 0
    }
    if (length > this.props.height) {
      this.scale.y = this.props.height * this.props.height / length // 纵向滚动条滑块的长度
    } else {
      this.scale.y = 0
    }
    return this.scale
  }
  moveXHandler(e: MouseEvent) {
    const { movement, ratio } = e.detail
    // const group = this.chartGroup.getBoundingRect()
    // const length = group.width * this.plus - this.props.width + 50
    const length = this.props.width * this.props.width / this.scale.x - this.props.width + 100
    const begin = - length / 2
    const end = length / 2
    const x = this.chartGroup.x - ratio * length
    this.chartGroup.attr({
      x: x > end ? end : x < begin ? begin : x
    })
  }
  moveYHandler(e: MouseEvent) {
    const { movement, ratio } = e.detail
    const length = this.props.height * this.props.height / this.scale.y - this.props.height + 50

    const begin = - length / 2
    const end = length / 2
    const y = this.chartGroup.y - ratio * length
    this.chartGroup.attr({
      y: y > end ? end : y < begin ? begin : y
    })
  }

  customRender (centerX: number, centerY: number) {
    const chart = new Group()
    // 六边形
    const radian = 2 * Math.PI / 360 * 60
    const { chartSize } = this.props
    for (let i = 0; i < chartSize; i++) {
      const circleR = (i + 1) * this.r
      const polyline = new Polyline({
        shape: {
          points: [
            [centerX - circleR, centerY],
            [centerX - circleR * Math.cos(radian), centerY - circleR * Math.sin(radian)],
            [centerX + circleR * Math.cos(radian), centerY - circleR * Math.sin(radian)],
            [centerX + circleR, centerY],
            [centerX + circleR * Math.cos(radian), centerY + circleR * Math.sin(radian)],
            [centerX - circleR * Math.cos(radian), centerY + circleR * Math.sin(radian)],
            [centerX - circleR, centerY]
          ]
        },
        style: {
          fill: 'none',
          stroke: this.props.theme[1]
        }
      })
      chart.add(polyline)
    }
    // 线
   this.lineArr1.forEach(line => {
      const newLine = new Line({
        shape: line.shape,
        style: line.style
      })
      newLine.attr({
        shape: {
          x1: line.shape.x1 + (centerX - this.centerX),
          y1: line.shape.y1 + (centerY - this.centerY),
          x2: line.shape.x2 + (centerX - this.centerX),
          y2: line.shape.y2 + (centerY - this.centerY),
        }
      })
      chart.add(newLine)
    })
    
    // 文本
    this.textArr.forEach(text => {
      const newText = new Text({
        style: text.style
      })
      newText.attr({
        x: text.x + (centerX - this.centerX),
        y: text.y + (centerY - this.centerY),
      })
      chart.add(newText)
    })
    if (this.props.showDate()) {
      this.dateArr.forEach(text => {
        const newText = new Text({
          style: text.style
        })
        newText.attr({
          x: text.x + (centerX - this.centerX),
          y: text.y + (centerY - this.centerY),
        })
        chart.add(newText)
      })
    }
    return chart
  }
}