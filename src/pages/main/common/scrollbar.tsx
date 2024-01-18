import { Group, Rect } from 'zrender'

interface scrollbarOption {
  width: number
  height: number
  overflow: 'both' | 'x' | 'y',
  ratioX: number,
  ratioY: number,
  dom: Element
}
interface trumbOption {
  begin: number,
  length: number
}
export default class scrollbar {
  trackW: number = 10 // 滚动条宽度
  thumbLength: number = 10

  width: number
  height: number

  overflow: string = 'both'
  ratioX: number
  ratioY: number

  horizontalGroup = new Group()
  horizontalTrumb = new Rect()
  verticalGroup = new Group()
  verticalTrumb = new Rect()

  center = [0, 0]

  moveX = { movement: 0, ratio: 0 }
  moveY = { movement: 0, ratio: 0 }
  moveXEvent
  moveYEvent
  dom
  constructor(props: scrollbarOption) {
    this.overflow = props.overflow
    this.width = props.width
    this.height = props.height

    this.ratioX = props.ratioX
    this.ratioY = props.ratioY

    this.init()
    window.addEventListener('wheel', (e) => {
      this.moveYHandler(e)
    })
    this.dom = props.dom
    this.moveXEvent = new CustomEvent('moveX', { 'detail': this.moveX });
    this.moveYEvent = new CustomEvent('moveY', { 'detail': this.moveY });
  }

  init() {
    if (this.overflow === 'x') {
      this.renderHorizontal()
    } else if (this.overflow === 'y') {
      this.renderVertical()
    } else {
      this.renderHorizontal()
      this.renderVertical()
    }
  }
  renderVertical() {
    const track = new Rect({
      shape: {
        x: this.width - this.trackW,
        y: 0,
        width: this.trackW,
        height: this.height,
      },
      style: {
        fill: '#F0F0F0',
        stroke: 'none'
      }
    })
    this.verticalTrumb = new Rect({
      shape: {
        x: this.width - this.trackW,
        y: 0, // 初始值：没有缩放
        width: this.trackW,
        height: this.height
      },
      style: {
        fill: '#A7A7A7',
        stroke: 'none'
      }
    })
    const handler = this.moveYHandler.bind(this)
    this.verticalTrumb.on('mousedown', () => {
      window.addEventListener('mousemove', handler)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', handler, false)
      })
    })
    this.verticalGroup.add(track)
    this.verticalGroup.add(this.verticalTrumb)
  }
  renderHorizontal() {
    const track = new Rect({
      shape: {
        x: 0,
        y: this.height - this.trackW,
        width: this.width, // 初始值：没有缩放
        height: this.trackW,
      },
      style: {
        fill: '#F0F0F0',
        stroke: 'none'
      }
    })
    this.horizontalTrumb = new Rect({
      shape: {
        x: 0,
        y: this.height - this.trackW,
        width: this.width,
        height: this.trackW
      },
      style: {
        fill: '#A7A7A7',
        stroke: 'none'
      }
    })
    const handler = this.moveXHandler.bind(this)
    this.horizontalTrumb.on('mousedown', () => {
      window.addEventListener('mousemove', handler)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', handler, false)
      })
    })
    this.horizontalGroup.add(track)
    this.horizontalGroup.add(this.horizontalTrumb)
  }
  moveXHandler(event: { type: string, movementX: number }) {
    const horizontalTrumb = this.horizontalTrumb.getBoundingRect()
    let x = horizontalTrumb.x + event.movementX
    const end = this.width - horizontalTrumb.width
    x = x > end ? end : x < 0 ? 0 : x
    this.horizontalTrumb.attr({
      shape: {
        x: x
      }
    })
    
    this.moveX.movement = event.movementX
    this.moveX.ratio = event.movementX / end
    this.dom.dispatchEvent(this.moveXEvent);
  }
  moveYHandler(event: { type: string, deltaY?: number, movementY?: number }) {
    const move = event.type === 'wheel' ? (event.deltaY || 0) / 50 : -(event.movementY || 0)
    const verticalTrumb = this.verticalTrumb.getBoundingRect()
    let y = verticalTrumb.y + move
    const end = this.height - verticalTrumb.height
    y = y > end ? end : y < 0 ? 0 : y
    this.verticalTrumb.attr({
      shape: {
        y: y
      }
    })
    this.moveY.movement = move
    this.moveY.ratio = move / end
    this.dom.dispatchEvent(this.moveYEvent);
  }
  getHorizontalGroup() {
    return this.horizontalGroup
  }
  getVerticalGroup() {
    return this.verticalGroup
  }
  getY() {
    return this.verticalTrumb.shape.height
  }
  getX() {
    return this.horizontalTrumb.shape.width
  }
  getEndX() {
    const horizontalTrumb = this.horizontalTrumb.getBoundingRect()
    return this.width - horizontalTrumb.width
  }
  getEndY() {
    const verticalTrumb = this.verticalTrumb.getBoundingRect()
    return this.height - verticalTrumb.height
  }
  getXMove() {
    const trumbx = this.horizontalTrumb.shape.x
    return trumbx - this.center[0]
  }
  getXMoveRatio() {
    return this.getXMove() / this.getEndX()
  }
  getYMove() {
    const trumby = this.verticalTrumb.shape.y
    return trumby - this.center[1]
  }
  getYMoveRatio() {
    return this.getYMove() / this.getEndY()
  }
  setHorizontalTrumb(params: trumbOption) {
    this.center[0] = params.begin
    this.horizontalTrumb.attr({
      shape: {
        x: params.begin,
        width: params.length
      }
    })
  }
  setVerticalTrumb(params: trumbOption) {
    this.center[1] = params.begin
    this.verticalTrumb.attr({
      shape: {
        y: params.begin,
        height: params.length
      }
    })
  }
}