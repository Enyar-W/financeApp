type chartType = 'wheel24' | 'squal9' | 'squal4' | 'hexagon' | 'master'
interface chartTypes {
  currentChartType: chartType,
  setCurrentChartType: function
}

interface headerOption {
  currentChartType: chartType,
  setCurrentChartType: function,
  step: number,
  setStep: function,
  beginValue: number,
  setBeginValue: function,
  chartSize: number,
  setChartSize: function,
  plus: number,
  setPlus: function,
  color: string,
  setColor: function,
  clear: boolean,
  setClear: function
}

interface appOption {
  currentChartType: chartType,
  beginValue: number,
  step: number,
  chartSize: number,
  plus: number,
  color: string,
  clear: boolean
}

interface commonOption {
  beginValue: number,
  step: number,
  chartSize: number,
  row?: number,
  column?: number,
  plus?: number,
  clear?: boolean
}

interface chartOption extends commonOption{
  width: number,
  height: number,
  getBg?: function,
  getPlus?: function
}

interface settingOption extends commonOption {
  show: boolean,
  title: string
}