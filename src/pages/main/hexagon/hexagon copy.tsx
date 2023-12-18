import { Group, Line, Text, Polyline, Rect } from 'zrender'

// function moveHandler (event: ElementEvent) {
//   const x = event.offsetX - centerX;
//   const y = event.offsetY - centerY;
//   const angle = Math.atan2(y, x)
//   lineGroup.attr({
//     rotation: -angle,
//     originX: centerX,
//     originY: centerY
//   })
// }
export default function hexagon ({
  width,
  height,
  beginValue = 1,
  step = 1,
  chartSize = 30,
  plus = 0,
  getBg
}: chartOption) {
  const group = new Group()
  const centerX = width / 2;
  const centerY = height / 2;
  
  // 六边形、文本
  const radian = 2 * Math.PI / 360 * 60
  const shapes = new Group()
  const valueGroup = new Group()
  let value = beginValue
  const r = (centerY - 50 - 8) / chartSize < 20 ? 20 + plus : (centerY - 50 - 8) / chartSize + plus
  for (let i = 0; i < chartSize; i++) {
    const circleR = (i + 1) * r
    shapes.add(
      new Polyline({
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
          stroke: '#666666'
        }
      })
    )
    const valueR = circleR - r / 2
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
        x: centerX + offsetX,
        y: centerY - offsetY,
        style: {
          text: '' + value,
          align: 'center',
          verticalAlign: 'middle',
          fill: (valueNum - j) % num === 0 ? '#ff0000' : (valueNum - (j + num / 2)) % num === 0 ? '#0000ff' : '#333333'
        }
      })
      valueGroup.add(text)
      text.on('click', () => {
        const color = getBg()
        text.attr({
          style: {
            backgroundColor: color
          }
        })
      })
      value = value + step
    }
  }
  group.add(valueGroup)
  group.add(shapes)

  // 线
  const lineGroup = new Group()
  const lineArr1: Line[] = []
  const lineArr2: Line[] = []
  for (let i = 0; i < 6; i++) {
    lineArr1[i] = new Line({
      style:{
        stroke: i % 2 === 0 ? '#ff0000' : '#0000ff',
      },
      shape:{
        x1 : centerX,
        y1 : centerY,
        x2 : centerX + r * chartSize * Math.cos(2 * Math.PI / 360 * 60 * i),
        y2 : centerY - r * chartSize * Math.sin(2 * Math.PI / 360 * 60 * i)
      }
    })
    lineGroup.add(lineArr1[i])

    lineArr2[i] = new Line({
      style:{
        stroke: '#999999',
        lineDash: [3, 1]
      },
      shape:{
        x1 : centerX,
        y1 : centerY,
        x2 : centerX + r * chartSize * Math.cos(2 * Math.PI / 360 * (30 + (i * 60))),
        y2 : centerY - r * chartSize * Math.sin(2 * Math.PI / 360 * (30 + (i * 60)))
      }
    })
    lineGroup.add(lineArr2[i])
  }
  const block = new Rect({
    shape: {
      x: centerX + r * chartSize - 5,
      y: centerY - 4,
      width: 10,
      height: 8
    },
    style: {
      fill: 'none',
      stroke: '#ff0000'
    }
  })

  const moveHandler = (event: MouseEvent) => {
    const x = event.offsetX - centerX;
    const y = event.offsetY - centerY;
    const angle = Math.atan2(y, x)
    const length = Math.sqrt(x * x + y * y)
    lineArr1.forEach((line, i) => {
      line.attr({
        shape: {
          x2 : centerX + length * Math.cos(2 * Math.PI / 360 * 60 * i - angle),
          y2 : centerY - length * Math.sin(2 * Math.PI / 360 * 60 * i - angle)
        }
      })
    })
    lineArr2.forEach((line, i) => {
      line.attr({
        shape: {
          x2 : centerX + length * Math.cos(2 * Math.PI / 360 * (30 + (i * 60)) - angle),
          y2 : centerY - length * Math.sin(2 * Math.PI / 360 * (30 + (i * 60)) - angle)
        }
      })
    })
    block.attr({
      shape: {
        x : centerX + length * Math.cos(-angle),
        y : centerY - length * Math.sin(-angle)
      }
    })
  }
  block.on('mousedown', () => {
    window.addEventListener('mousemove', moveHandler)
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', moveHandler, false)
    })
  })

  block.on('mouseup', () => {
    window.removeEventListener('mousemove', moveHandler, false)
  })
  
  lineGroup.add(block)
  group.add(lineGroup)

  return group
}