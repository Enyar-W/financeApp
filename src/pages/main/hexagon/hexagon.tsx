import { Group, Line, Text, Polyline, Rect } from 'zrender'
import scrollbar from './../common/scrollbar';
export default class hexagon {
  scrollbarIns: scrollbar | null = null
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
  lineLength: number = 0
  chartSize: number
  endValue: number // 下一圈开始的数字
  totalWidth: number // 页面总宽度
  totalHeight: number // 页面总高度

  props
  constructor(props: chartOption) {
    this.chartSize = props.getChartSize()
    this.endValue = props.beginValue
    this.totalWidth = props.width
    this.totalHeight = props.height
    this.centerX = props.width / 2
    this.centerY = props.height / 2
    this.props = props
    this.r = 50
    this.lineLength = this.r * this.chartSize + 10
    this.chartGroup = new Group({
      x: 0,
      y: 0,
      originX: this.centerX,
      originY: this.centerY,
      scaleX: 1,
      scaleY: 1
    })
    this.init()
    const xHandler = this.moveXHandler.bind(this)
    const yHandler = this.moveYHandler.bind(this)

    this.props.zr.dom.addEventListener('moveX', xHandler)
    this.props.zr.dom.addEventListener('moveY', yHandler)
  }

  init() {
    this.renderShapeAndValue(this.chartSize, 0)
    this.renderLine()
    this.chartGroup.add(this.shapeGroup)
    this.chartGroup.add(this.textGroup)
    this.chartGroup.add(this.lineGroup)
    this.props.showDate() && this.chartGroup.add(this.dateGroup)
    this.scrollbarRender()
  }

  scrollbarRender() {
    this.scrollbarIns = new scrollbar({
      width: this.props.width,
      height: this.props.height,
      overflow: 'both',
      ratioX: 1,
      ratioY: 1,
      dom: this.props.zr.dom
    })
    this.setScale()
  }
  setScale() { // 设置滚动条
    const { x, y } = this.scaleHandler(this.props.getPlus())
    if (x > 0) {
      this.scrollbarIns?.setHorizontalTrumb({
        begin: (this.props.width - x) / 2,
        length: x
      })
      this.scrollbarIns?.getHorizontalGroup() && this.props.zr?.add(this.scrollbarIns?.getHorizontalGroup())
    } else {
      this.scrollbarIns?.getHorizontalGroup() && this.props.zr?.remove(this.scrollbarIns?.getHorizontalGroup())
    }
    if (y > 0) {
      this.scrollbarIns?.setVerticalTrumb({
        begin: (this.props.height - y) / 2,
        length: y
      })
      this.scrollbarIns?.getVerticalGroup() && this.props.zr?.add(this.scrollbarIns?.getVerticalGroup())
    } else {
      this.scrollbarIns?.getVerticalGroup() && this.props.zr?.remove(this.scrollbarIns?.getVerticalGroup())
    }
  }
  renderShapeAndValue(chartSize: number, beginSize = 0) { // 六边形、文本
    const radian = 2 * Math.PI / 360 * 60
    const beginDate = new Date(this.props.beginDate).getTime()
    for (let i = beginSize; i < chartSize; i++) { // 每一圈
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

        const date = new Date(beginDate + (this.endValue - this.props.beginValue) * 24 * 60 * 60 * 1000)
        const dateStr = (date.getMonth() + 1) + '/' + date.getDate()

        const offsetY1 = this.props.getFontSize() / 2
        const text = new Text({
          z: 100,
          x: this.centerX + offsetX,
          y: this.centerY - offsetY - (this.props.showDate() ? offsetY1 : 0),
          style: {
            text: '' + this.endValue,
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

        this.textGroup.add(text)
        this.textArr.push(text)
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

        this.endValue = this.endValue + this.props.step
      }
    }
  }
  changeChartSize() {
    const chartSize = this.props.getChartSize()
    if (chartSize > this.chartSize) {
      this.renderShapeAndValue(chartSize, this.chartSize)
    } else {
      for (let i = this.chartSize - 1; i > chartSize - 1; i--) {
        this.shapeGroup.remove(this.shapeArr[i]);
        this.shapeArr.splice(i, 1)
        const last = (1 + i + 1) * (i + 1) / 2 * 6
        const next = (1 + i) * i / 2 * 6
        for (let j = last - 1; j >= next; j--) {
          this.textGroup.remove(this.textArr[j]);
          this.textArr.splice(j, 1)
          this.dateGroup.remove(this.textArr[j]);
          this.dateArr.splice(j, 1)
        }
        this.endValue = Number(this.textArr[this.textArr.length - 1].style.text) + this.props.step
      }
    }
    this.chartSize = chartSize
    this.setScale()
  }
  renderLine() {
    const colors = ['#ff0000', '#0000ff', '#999999', '#ff0000', '#0000ff', '#999999']
    for (let i = 0; i < 6; i++) {
      const angleX = this.lineLength * Math.cos(2 * Math.PI / 360 * 30 * i)
      const angleY = this.lineLength * Math.sin(2 * Math.PI / 360 * 30 * i)
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
        x: this.centerX + this.lineLength - 5,
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
    this.lineArr1[0].on('mousedown', (e) => {
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

  moveHandler(event: MouseEvent) { // 线的旋转缩放
    // 思路：  缩放后的中心点误差

    const ratioX = this.scrollbarIns?.getXMoveRatio() || 0
    const ratioY = this.scrollbarIns?.getYMoveRatio() || 0
    // const shape = this.getExtraShape()
    const extraX = this.totalWidth - this.props.width
    const extraY = this.totalHeight - this.props.height
    const centerX = this.centerX
    const centerY = this.centerY
    // 鼠标位置加上滚动条的位置差
    const x = event.offsetX + ratioX * extraX - centerX
    const y = event.offsetY + ratioY * extraY - centerY
    const angle = Math.atan2(y, x)
    const length = Math.sqrt(x * x + y * y)

    this.rerenderLine(angle, length / this.props.getPlus())
  }

  rerenderLine(angle: number, length: number) {
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
    let x = 0 // 横向滚动条滑块的长度
    let y = 0 // 纵向滚动条滑块的长度
    this.totalWidth = this.props.width
    this.totalHeight = this.props.height
    if (length > this.props.width) {
      x = this.props.width * this.props.width / length 
      this.totalWidth = length
    }

    if (length > this.props.height) {
      y = this.props.height * this.props.height / length // 纵向滚动条滑块的长度
      this.totalHeight = Number(length)
    }
    return { x, y }
  }
  // getExtraShape() {
  //   const x = this.scaleX ? this.props.width * this.props.width / this.scaleX - this.props.width : 0
  //   const y = this.scaleY ? this.props.height * this.props.height / this.scaleY - this.props.height : 0 // 超出页面部分
  //   return [x, y]
  // }
  moveXHandler(e: MouseEvent) {
    const { movement, ratio } = e.detail
    // const length = this.getExtraShape()[0] // 超出页面部分
    const length = this.totalWidth - this.props.width
    const begin = - length / 2
    const end = length / 2
    const x = this.chartGroup.x - ratio * length
    this.chartGroup.attr({
      x: x > end ? end : x < begin ? begin : x
    })
  }
  moveYHandler(e: MouseEvent) {
    const { movement, ratio } = e.detail
    // const length = this.getExtraShape()[1]
    const length = this.totalHeight - this.props.height
    const begin = -length / 2
    const end = length / 2

    const y = this.chartGroup.y - ratio * length
    this.chartGroup.attr({
      y: y > end ? end : y < begin ? begin : y,
      originY: this.centerY
    })
  }

  customRender(centerX: number, centerY: number) {
    const chart = new Group()
    // 六边形
    const radian = 2 * Math.PI / 360 * 60
    for (let i = 0; i < this.chartSize; i++) {
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