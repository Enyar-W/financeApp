import { Group, Rect } from 'zrender'
interface scrollbarOption {
  width: number
  height: number
  overflow: 'both' | 'x' | 'y',
  ratioX: number,
  ratioY: number
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

  constructor(props: scrollbarOption) {
    this.overflow = props.overflow
    this.width = props.width
    this.height = props.height

    this.ratioX = props.ratioX
    this.ratioY = props.ratioY

    this.init()
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
    const length = 0 // 初始值，瞎写的
    this.verticalTrumb = new Rect({
      shape: {
        x: this.width - this.trackW,
        y: (this.height - length) / 2,
        width: this.trackW,
        height: length
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
        width: this.width,
        height: this.trackW,
      },
      style: {
        fill: '#F0F0F0',
        stroke: 'none'
      }
    })
    const length = 0 // 初始值，瞎写的
    this.horizontalTrumb = new Rect({
      shape: {
        x: (this.width - length) / 2,
        y: this.height - this.trackW,
        width: length,
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
    const moveEvent = new CustomEvent('moveX', { 'detail': { movement: event.movementX, ratio: event.movementX / end } });
    document.dispatchEvent(moveEvent);
  }
  moveYHandler(event: { type: string, deltaY?: number, movementY?: number }) {
    const move = event.type === 'wheel' ? event.deltaY || 0 : -(event.movementY || 0)
    const verticalTrumb = this.verticalTrumb.getBoundingRect()
    let y = verticalTrumb.y + move
    const end = this.height - verticalTrumb.height
    y = y > end ? end : y < 0 ? 0 : y
    this.verticalTrumb.attr({
      shape: {
        y: y
      }
    })
    const moveEvent = new CustomEvent('moveY', { 'detail': { movement: move, ratio: move / end } });
    document.dispatchEvent(moveEvent);
  }
  getHorizontalGroup() {
    return this.horizontalGroup
  }
  getVerticalGroup() {
    return this.verticalGroup
  }
  getY () {
    return this.verticalTrumb.shape.height
  }
  getX () {
    return this.horizontalTrumb.shape.width
  }
  setHorizontalTrumb(params: trumbOption) {
    this.horizontalTrumb.attr({
      shape: {
        x: params.begin,
        width: params.length
      }
    })
  }
  setVerticalTrumb(params: trumbOption) {
    this.verticalTrumb.attr({
      shape: {
        y: params.begin,
        height: params.length
      }
    })
  }
  toCenter () {
    if (this.horizontalTrumb.shape.width > 0) {
      const centerX = (this.width - this.horizontalTrumb.shape.width) / 2
      this.moveXHandler({ type: 'move', movementX: this.verticalTrumb.shape.x - centerX })
    }
    if (this.verticalTrumb.shape.height > 0) {
      const centerY = (this.height - this.verticalTrumb.shape.height) / 2
      this.moveYHandler({ type: 'move', movementY: this.verticalTrumb.shape.y - centerY })
    }
  }
}