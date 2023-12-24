import './App.css'

import Header from './pages/header'
import Main from './pages/main'
import { useState } from 'react';
function App() {
  const [currentChartType, setCurrentChartType] = useState<chartType>('hexagon');
  const [step, setStep] = useState(1);
  const [beginValue, setBeginValue] = useState(1);
  const [chartSize, setChartSize] = useState(14);
  const [plus, setPlus] = useState(1)
  const [color, setColor] = useState('#0080FF')
  const [clear, setClear] = useState(true)
  const [fontSize, setFontSize] = useState(12)
  return (
    <div className="app">
      <Header
        currentChartType={currentChartType}
        setCurrentChartType={setCurrentChartType}
        step={step}
        setStep={setStep}
        beginValue={beginValue}
        setBeginValue={setBeginValue}
        chartSize={chartSize}
        setChartSize={setChartSize}
        plus={plus}
        setPlus={setPlus}
        color={color}
        setColor={setColor}
        clear={clear}
        setClear={setClear}
        fontSize={fontSize}
        setFontSize={setFontSize}
      ></Header>
      <Main currentChartType={currentChartType} step={step} beginValue={beginValue} chartSize={chartSize} plus={plus} color={color} clear={clear} fontSize={fontSize}></Main>
    </div>
  )
}

export default App
