import { Group, Rect} from 'zrender'
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
  ratioY:number

  horizontalGroup = new Group()
  horizontalTrumb = new Rect()
  verticalGroup = new Group()
  verticalTrumb = new Rect()

  constructor (props: scrollbarOption) {
    this.overflow = props.overflow
    this.width = props.width
    this.height = props.height

    this.ratioX = props.ratioX
    this.ratioY = props.ratioY

    this.init()
  }

  init () {
    if (this.overflow === 'x') {
      this.renderHorizontal()
    } else if (this.overflow === 'y') {
      this.renderVertical()
    } else {
      this.renderHorizontal()
      this.renderVertical()
    }
  }
  renderVertical () {
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
    const length = 10 // 初始值，瞎写的
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
  renderHorizontal () {
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
    const length = 10 // 初始值，瞎写的
    this.horizontalTrumb = new Rect({
      shape: {
        x: (this.width - length) / 2,
        y:  this.height - this.trackW,
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
  moveXHandler (event: MouseEvent) {
    // const offsetX = event.offsetX
    console.log('move---', event.movementX)
    const horizontalTrumb = this.horizontalTrumb.getBoundingRect()
    const x = horizontalTrumb.x + event.movementX
    const end = this.width - horizontalTrumb.width
    this.horizontalTrumb.attr({
      shape: {
        x: x > end ? end : x < 0 ? 0 : x
      }
    })
    if (x <= end || x >= 0) {
      const moveEvent = new CustomEvent('moveX', { 'detail': { movement: event.movementX } });
      document.dispatchEvent(moveEvent);
    }
  }
  moveYHandler (event: MouseEvent) {
    // const offsetX = event.offsetX
    console.log('move---', event.movementX)
    const horizontalTrumb = this.horizontalTrumb.getBoundingRect()
    const y = horizontalTrumb.y + event.movementY
    const end = this.height - horizontalTrumb.height
    this.verticalTrumb.attr({
      shape: {
        y: y > end ? end : y < 0 ? 0 : y
      }
    })
    if (y <= end || y >= 0) {
      const moveEvent = new CustomEvent('moveY', { 'detail': { movement: event.movementY } });
      document.dispatchEvent(moveEvent);
    }
  }
  getHorizontalGroup () {
    return this.horizontalGroup
  }
  getVerticalGroup () {
    return this.verticalGroup
  }
  setHorizontalTrumb (params: trumbOption) {
    this.horizontalTrumb.attr({
      shape: {
        x: params.begin,
        width: params.length
      }
    })
  }
  setVerticalTrumb (params: trumbOption) {
    this.verticalTrumb.attr({
      shape: {
        y: params.begin,
        height: params.length
      }
    })
  }
}