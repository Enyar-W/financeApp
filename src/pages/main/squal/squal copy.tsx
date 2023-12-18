import '../common/table.css'
function getClass (isCustom: boolean, isCorner: boolean, isCenter = false) {
  let className = 'cell'
  if (isCustom) className += ' custom'
  if (isCorner) className += ' corner'
  if (isCenter) className += ' center'
  return className
}
export default function squal9 ({ beginValue, step, chartSize }: commonOption) {
  const matrix = chartSize * 2 + 2
  const rows = []

  for (let r = 0; r < matrix; r++) {
    const cols = []
    const max = (2 * (chartSize - r) + 2) * (2 * (chartSize - r) + 2) // 每一圈的最大值
    const min = (2 * (chartSize - r - 1) + 2) * (2 * (chartSize - r - 1) + 2) + 1 // 每一圈的最小值
    let corVal = (max - min - 1) / 2 + min - chartSize + r // 每一圈中的左上角顶点的值 TODO计算公式有待考究
    let corNum = r
    if (r === chartSize + 1) {
      corVal = 3
      corNum = chartSize
    } else if (r > chartSize + 1) {
      // const num9 = r - (chartSize + 1)
      // corVal = 3 + 9 * num9 + 8 * (num9 -1)
      corNum = matrix - 1 - r
      const n1 = chartSize - corNum
      const n2 = 1
      const num8 = (n1 + n2) * (n1 - n2 + 1) / 2
      corVal = 3 + num8 * 8 + (chartSize - corNum)
    }

    let corEndVal = 0
    let corEndNum = 0
    for (let c = 0; c < matrix; c++) {
      const isCenter = r === chartSize || r === chartSize + 1 || c === chartSize || c === chartSize + 1
      // 左上角
      if (r < chartSize + 1) { // 上半
        if (c < matrix - r) { // 左上半
          if (c < corNum) {
            const n1 = chartSize - c
            const n2 = chartSize - corNum + 1
            const num8 = (n1 + n2) * (n1 - n2 + 1) / 2
            cols.push(<div className={getClass(c % 2 === 0, false, isCenter)} key={r + '_' + c}>{ corVal + num8 * 8 }</div>)
          } else if (c === corNum) {
            cols.push(<div className={getClass(r % 2 === 0, true, isCenter)} key={r + '_' + c}>{ corVal }</div>)
          } else {
            cols.push(<div className={getClass(r % 2 === 0, c + 1 === matrix - r, isCenter)} key={r + '_' + c}>{ corVal - c + corNum }</div>)
            corEndVal = corVal - c + corNum
          }
          corEndNum = c
        } else { // 右上半
          const c1 = c - chartSize - 2 + 1
          const a1 = 1 + (c1 - 1) * 2
          const an = a1 - (c - corEndNum - 1) * 2
          cols.push(<div className={getClass(c % 2 !== 0, false, isCenter)} key={r + '_' + c}>{corEndVal + 4 * ((c - corEndNum) * (a1 + an) / 2)}</div>)
        }
      } else { // 下半
        if (c < r + 1) { // 左下半
          if (c < corNum) {
            const n1 = chartSize - c
            const n2 = chartSize - corNum + 1
            const num8 = (n1 + n2) * (n1 - n2 + 1) / 2
            cols.push(<div className={getClass(c % 2 === 0, false, isCenter)} key={r + '_' + c}>{ corVal + num8 * 8 }</div>)
          } else if (c === corNum) {
            cols.push(<div className={getClass(r % 2 !== 0 , true, isCenter)} key={r + '_' + c}>{ corVal }</div>)
          } else {
            cols.push(<div className={getClass(r % 2 !== 0, c === r, isCenter)} key={r + '_' + c}>{ corVal + c - corNum }</div>)
            corEndVal = corVal + c - corNum
          }
          corEndNum = c
        } else { // 右下半
          const n = c - corEndNum
          const a1 = r - chartSize
          const an = c - chartSize - 1
          cols.push(<div className={getClass(c % 2 !== 0, false, isCenter)} key={r + '_' + c}>{corEndVal + n * 4 + 8 * (n * (a1 + an) / 2)}</div>)
        }
      }
    }
    rows.push(<div className='row' key={r}>{cols}</div>)
  }

  return rows
}