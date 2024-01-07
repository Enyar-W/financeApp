import { ZRenderType } from "zrender"

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
  setClear: function,
  fontSize: number,
  setFontSize: function,
  theme: [string, string],
  setTheme: function,
  showDate: boolean,
  setShowDate: function,
  beginDate: string,
  setBeginDate: function
}

interface appOption {
  currentChartType: chartType,
  beginValue: number,
  step: number,
  chartSize: number,
  plus: number,
  color: string,
  clear: boolean,
  fontSize: number,
  theme: string,
  showDate: boolean,
  beginDate: string,
}

interface commonOption {
  beginValue: number,
  step: number,
  chartSize: number,
  row?: number,
  column?: number,
  plus?: number,
  clear?: boolean,
  fontSize?: number,
}

interface chartOption extends commonOption {
  zr: ZRenderType
  width: number,
  height: number,
  getBg?: function,
  getPlus?: function,
  getFontSize?: function
}

interface settingOption extends commonOption {
  show: boolean,
  title: string
}