import { Group, Polygon, Circle, Line, Text } from 'zrender'
export default function wheel24 ({
  width,
  height,
  beginValue = 1,
  step = 1,
  chartSize = 30
}: chartOption) {
  const group = new Group()
  const centerX = width / 2;
  const centerY = height / 2;
  const centerR = 8
  const circleR = (centerY - 100 - 8) / chartSize < 20 ? 20 : (centerY - 100 - 8) / chartSize
  // 中心圆
  const base = new Polygon({
    shape: {
      points: [
        [centerX, centerY - centerR],
        [centerX - centerR, centerY],
        [centerX, centerY + centerR],
        [centerX + centerR, centerY],
      ]
    },
    style: {
      fill: '#858585'
    }
  })
  group.add(base)
  // 圆
  const circleGroup = new Group()
  for (let i = chartSize; i >= 0; i--) {
    circleGroup.add(
      new Circle({
        shape: {
          cx: centerX,
          cy: centerY,
          r: circleR + circleR * i
        },
        style: {
          stroke: '#858585',
          fill: i % 2 === 0 && i !== 0 ? '#FFE1FF' : '#ffffff'
        }
      })
    ) 
  }
  group.add(circleGroup)
  // 线、文本
  const lineGroup = new Group()
  const valueGroup = new Group()
  for (let i = 0; i < 24; i++) {
    lineGroup.add(
      new Line({
        shape: {
          x1: centerX,
          y1: centerY,
          x2: centerX + Math.cos(Math.PI / 12 * i) * circleR * (chartSize + 1),
          y2: centerY - Math.sin(Math.PI / 12 * i) * circleR * (chartSize + 1)
        },
        style: {
          stroke: '#858585',
          fill: 'none'
        }
      })
    )
    for (let j = 0; j < chartSize; j++) {
      valueGroup.add(
        new Text({
          x: centerX + Math.cos(Math.PI / 12 * i + Math.PI / 24) * (circleR * (j + 2) - circleR / 2),
          y: centerY - Math.sin(Math.PI / 12 * i + Math.PI / 24) * (circleR * (j + 2) - circleR / 2),
          style: {
            text: '' + (beginValue + (i * step) + (24 * step * j )),
            align: 'center',
            verticalAlign: 'middle',
            fill: [0, 6, 12, 18].includes(i) ? '#ff0000' :  [8, 16].includes(i) ? '#0000ff' : '#000000'
          }
        })
      )
    }
  }
  group.add(lineGroup)
  group.add(valueGroup)
  return group
}