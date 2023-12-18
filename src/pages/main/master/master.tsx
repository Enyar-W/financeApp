import '../commonStyle/table.css'
function getClass (r = 0, c = 0, chartSize = 0) {
  let center = Number((chartSize / 2).toFixed())
  if (chartSize % 2 !== 0) {
    center = Number(((chartSize - 1) / 2).toFixed())
  }
  if (r === c || r + c === chartSize - 1) {
    return 'cell corner'
  }
  if (
    (chartSize % 2 === 0 && (r === center || r === center - 1 || c === center || c === center - 1)) ||
    (chartSize % 2 !== 0 && (r === center || c === center))
  ) {
    return 'cell center'
  }
  return 'cell'
}
export default function master ({ beginValue, step, chartSize }: commonOption) {
  const rows = []
  for (let r = 0; r < chartSize; r++) {
    const cols = []
    for (let c = 0; c < chartSize; c++) {
      cols.push(<div className={getClass(r, c, chartSize)} key={r + '_' + c}>{ beginValue + (chartSize - 1 - r) * step + chartSize * step * c }</div>)
    }
    rows.push(<div className="row" key={r}>{cols}</div>)
  }
  return rows
}