import './index.css'

export default function Header (params: headerOption) {
  return (
    <div className="head">
      <div className="chartTabs">
        <div className={params.currentChartType === 'wheel24' ? 'tab active' : 'tab'} onClick={() => params.setCurrentChartType('wheel24')}>
          <div className="wheel24"></div>
        </div>
        <div className={params.currentChartType === 'squal9' ? 'tab active' : 'tab'} onClick={() => params.setCurrentChartType('squal9')}>
          <div className="squal">9</div>
        </div>
        <div className={params.currentChartType === 'squal4' ? 'tab active' : 'tab'} onClick={() => params.setCurrentChartType('squal4')}>
          <div className="squal">4</div>
        </div>
        <div className={params.currentChartType === 'hexagon' ? 'tab active' : 'tab'} onClick={() => params.setCurrentChartType('hexagon')}>
          <div className="hexagon">
            <svg t="1702518033987" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5301" width="20" height="20"><path d="M282.709333 874.026667A42.624 42.624 0 0 0 320 896h384a42.624 42.624 0 0 0 37.290667-21.973333l189.610666-341.333334a42.666667 42.666667 0 0 0 0-41.472l-189.610666-341.333333A42.709333 42.709333 0 0 0 704 128h-384a42.666667 42.666667 0 0 0-37.290667 21.930667l-189.610666 341.333333a42.666667 42.666667 0 0 0 0 41.472l189.610666 341.290667zM345.130667 213.333333h333.738666l165.973334 298.666667-165.973334 298.666667H345.130667l-165.973334-298.666667 165.973334-298.666667z" fill="#EA6A01" p-id="5302"></path></svg>
          </div>
        </div>
        <div className={params.currentChartType === 'master' ? 'tab active' : 'tab'} onClick={() => params.setCurrentChartType('master')}>
          <div className="master">
            <svg t="1702519602139" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9509" id="mx_n_1702519602140" width="20" height="20"><path d="M896 85.333333H128a42.666667 42.666667 0 0 0-42.666667 42.666667v768a42.666667 42.666667 0 0 0 42.666667 42.666667h768a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-42.666667-42.666667zM341.333333 853.333333H170.666667v-170.666666h170.666666z m0-256H170.666667v-170.666666h170.666666z m0-256H170.666667V170.666667h170.666666z m256 512h-170.666666v-170.666666h170.666666z m0-256h-170.666666v-170.666666h170.666666z m0-256h-170.666666V170.666667h170.666666z m256 512h-170.666666v-170.666666h170.666666z m0-256h-170.666666v-170.666666h170.666666z m0-256h-170.666666V170.666667h170.666666z" p-id="9510" fill="#EA6A01"></path></svg>
          </div>
        </div>
        <div className="tab setting">
          <svg t="1702522140975" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11023" width="20" height="20"><path d="M859.3 569.7l0.2 0.1c3.1-18.9 4.6-38.2 4.6-57.3 0-17.1-1.3-34.3-3.7-51.1 2.4 16.7 3.6 33.6 3.6 50.5 0 19.4-1.6 38.8-4.7 57.8zM99 398.1c-0.5-0.4-0.9-0.8-1.4-1.3 0.7 0.7 1.4 1.4 2.2 2.1l65.5 55.9v-0.1L99 398.1z m536.6-216h0.1l-15.5-83.8c-0.2-1-0.4-1.9-0.7-2.8 0.1 0.5 0.3 1.1 0.4 1.6l15.7 85z m54 546.5l31.4-25.8 92.8 32.9c17-22.9 31.3-47.5 42.6-73.6l-74.7-63.9 6.6-40.1c2.5-15.1 3.8-30.6 3.8-46.1s-1.3-31-3.8-46.1l-6.5-39.9 74.7-63.9c-11.4-26-25.6-50.7-42.6-73.6l-92.8 32.9-31.4-25.8c-23.9-19.6-50.6-35-79.3-45.8l-38.1-14.3-17.9-97a377.5 377.5 0 0 0-85 0l-17.9 97.2-37.9 14.3c-28.5 10.8-55 26.2-78.7 45.7l-31.4 25.9-93.4-33.2c-17 22.9-31.3 47.5-42.6 73.6l75.5 64.5-6.5 40c-2.5 14.9-3.7 30.2-3.7 45.5 0 15.2 1.3 30.6 3.7 45.5l6.5 40-75.5 64.5c11.4 26 25.6 50.7 42.6 73.6l93.4-33.2 31.4 25.9c23.7 19.5 50.2 34.9 78.7 45.7l37.8 14.5 17.9 97.2c28.2 3.2 56.9 3.2 85 0l17.9-97 38.1-14.3c28.8-10.8 55.4-26.2 79.3-45.8z m-177.1-50.3c-30.5 0-59.2-7.8-84.3-21.5C373.3 627 336 568.9 336 502c0-97.2 78.8-176 176-176 66.9 0 125 37.3 154.8 92.2 13.7 25 21.5 53.7 21.5 84.3 0 97.1-78.7 175.8-175.8 175.8zM207.2 812.8c-5.5 1.9-11.2 2.3-16.6 1.2 5.7 1.2 11.7 1 17.5-1l81.4-29c-0.1-0.1-0.3-0.2-0.4-0.3l-81.9 29.1z m717.6-414.7l-65.5 56c0 0.2 0.1 0.5 0.1 0.7l65.4-55.9c7.1-6.1 11.1-14.9 11.2-24-0.3 8.8-4.3 17.3-11.2 23.2z" fill="#D9D9D9" p-id="11024"></path><path d="M935.8 646.6c0.5 4.7 0 9.5-1.7 14.1l-0.9 2.6a446.02 446.02 0 0 1-79.7 137.9l-1.8 2.1a32 32 0 0 1-35.1 9.5l-81.3-28.9a350 350 0 0 1-99.7 57.6l-15.7 85a32.05 32.05 0 0 1-25.8 25.7l-2.7 0.5a445.2 445.2 0 0 1-79.2 7.1h0.3c26.7 0 53.4-2.4 79.4-7.1l2.7-0.5a32.05 32.05 0 0 0 25.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l0.9-2.6c1.6-4.7 2.1-9.7 1.5-14.5z" fill="#D9D9D9" p-id="11025"></path><path d="M688 502c0-30.3-7.7-58.9-21.2-83.8C637 363.3 578.9 326 512 326c-97.2 0-176 78.8-176 176 0 66.9 37.3 125 92.2 154.8 24.9 13.5 53.4 21.2 83.8 21.2 97.2 0 176-78.8 176-176z m-288 0c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502z" p-id="11026"></path><path d="M594.1 952.2a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l0.9-2.6c1.7-4.6 2.2-9.4 1.7-14.1-0.9-7.9-4.7-15.4-11-20.9l-65.3-55.9-0.2-0.1c3.1-19 4.7-38.4 4.7-57.8 0-16.9-1.2-33.9-3.6-50.5-0.3-2.2-0.7-4.4-1-6.6 0-0.2-0.1-0.5-0.1-0.7l65.5-56c6.9-5.9 10.9-14.4 11.2-23.2 0.1-4-0.5-8.1-1.9-12l-0.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.4-44-99.6-57.6h-0.1l-15.7-85c-0.1-0.5-0.2-1.1-0.4-1.6a32.08 32.08 0 0 0-25.4-24.1l-2.7-0.5c-52.1-9.4-106.9-9.4-159 0l-2.7 0.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-0.9 2.6a32.09 32.09 0 0 0 7.9 33.9c0.5 0.4 0.9 0.9 1.4 1.3l66.3 56.6v0.1c-3.1 18.8-4.6 37.9-4.6 57 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l0.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1c4.9 5.7 11.4 9.4 18.5 10.7 5.4 1 11.1 0.7 16.6-1.2l81.9-29.1c0.1 0.1 0.3 0.2 0.4 0.3 29.7 24.3 62.8 43.6 98.6 57.1l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7 0.5c26.1 4.7 52.8 7.1 79.5 7.1h0.3c26.6 0 53.3-2.4 79.2-7.1l2.7-0.5z m-39.8-66.5a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97z" p-id="11027"></path></svg>
        </div>
      </div>
      <div className="settingTabs">
        <div className="tab">
          <span className='label'>Begin Value</span>
          <input type="number" value={params.beginValue} onChange={(e) => params.setBeginValue(Number(e.target.value))} min={1} className='val'/>
        </div>
        <div className="tab">
          <span className='label'>Step</span>
          <input type="number" value={params.step} onChange={(e) => params.setStep(Number(e.target.value))} min={1} className='val'/>
        </div>
        <div className="tab">
          <span className='label'>Chart Size</span>
          <input type="number" value={params.chartSize} onChange={(e) => params.setChartSize(Number(e.target.value))} min={1} className='val'/>
        </div>
      </div>
      <div className="magnifyTabs">
        <div className='tab' onClick={() => params.setPlus(params.plus + 0.1)}>
          <svg t="1702631672733" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16964" width="18" height="18"><path d="M831.903143 415.939071c0 91.786555-29.795635 176.574135-79.988283 245.364058l253.162915 253.362887c24.996338 24.996338 24.996338 65.590392 0 90.58673s-65.590392 24.996338-90.58673 0L661.328129 751.88986c-68.789923 50.392618-153.577503 79.988283-245.364058 79.988283C186.197729 831.878143 0.025 645.705414 0.025 415.939071S186.197729 0 415.964071 0s415.939071 186.172729 415.939072 415.939071z m-463.932041 175.974223c0 26.596104 21.396866 47.99297 47.992969 47.99297s47.99297-21.396866 47.99297-47.99297v-127.981253h127.981253c26.596104 0 47.99297-21.396866 47.99297-47.99297s-21.396866-47.99297-47.99297-47.992969h-127.981253v-127.981253c0-26.596104-21.396866-47.99297-47.99297-47.99297s-47.99297 21.396866-47.992969 47.99297v127.981253h-127.981253c-26.596104 0-47.99297 21.396866-47.99297 47.992969s21.396866 47.99297 47.99297 47.99297h127.981253v127.981253z" p-id="16965" fill="#c8db8c"></path></svg>
        </div>
        <div className='tab' onClick={() => params.setPlus(params.plus - 0.1)}>
          <svg t="1702632367251" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17386" width="18" height="18"><path d="M831.903143 415.939071c0 91.786555-29.795635 176.574135-79.988283 245.364058l253.162915 253.362887c24.996338 24.996338 24.996338 65.590392 0 90.58673s-65.590392 24.996338-90.58673 0L661.328129 751.88986c-68.789923 50.392618-153.577503 79.988283-245.364058 79.988283C186.197729 831.878143 0.025 645.705414 0.025 415.939071S186.197729 0 415.964071 0s415.939071 186.172729 415.939072 415.939071z m-559.917981-47.992969c-26.596104 0-47.99297 21.396866-47.99297 47.992969s21.396866 47.99297 47.99297 47.99297h287.957819c26.596104 0 47.99297-21.396866 47.99297-47.99297s-21.396866-47.99297-47.99297-47.992969H271.985162z" p-id="17387" fill="#c8db8c"></path></svg>
        </div>
      </div>
      <div className="colorTabs">
        <div className={params.color === '#808080' ? 'tab active' : 'tab'} style={{background: '#808080'}}  onClick={() => params.setColor('#808080')}></div>
        <div className={params.color === '#800000' ? 'tab active' : 'tab'} style={{background: '#800000'}}  onClick={() => params.setColor('#800000')}></div>
        <div className={params.color === '#FF0000' ? 'tab active' : 'tab'} style={{background: '#FF0000'}}  onClick={() => params.setColor('#FF0000')}></div>
        <div className={params.color === '#FFFF00' ? 'tab active' : 'tab'} style={{background: '#FFFF00'}}  onClick={() => params.setColor('#FFFF00')}></div>
        <div className={params.color === '#008000' ? 'tab active' : 'tab'} style={{background: '#008000'}}  onClick={() => params.setColor('#008000')}></div>
        <div className={params.color === '#80FF00' ? 'tab active' : 'tab'} style={{background: '#80FF00'}}  onClick={() => params.setColor('#80FF00')}></div>
        <div className={params.color === '#008080' ? 'tab active' : 'tab'} style={{background: '#008080'}}  onClick={() => params.setColor('#008080')}></div>
        <div className={params.color === '#00FFFF' ? 'tab active' : 'tab'} style={{background: '#00FFFF'}}  onClick={() => params.setColor('#00FFFF')}></div>
        <div className={params.color === '#0000FF' ? 'tab active' : 'tab'} style={{background: '#0000FF'}}  onClick={() => params.setColor('#0000FF')}></div>
        <div className={params.color === '#800080' ? 'tab active' : 'tab'} style={{background: '#800080'}}  onClick={() => params.setColor('#800080')}></div>
        <div className={params.color === '#808000' ? 'tab active' : 'tab'} style={{background: '#808000'}}  onClick={() => params.setColor('#808000')}></div>
        <div className={params.color === '#80FF80' ? 'tab active' : 'tab'} style={{background: '#80FF80'}}  onClick={() => params.setColor('#80FF80')}></div>
        <div className={params.color === '#0080FF' ? 'tab active' : 'tab'} style={{background: '#0080FF'}}  onClick={() => params.setColor('#0080FF')}></div>
        <div className={params.color === '#004080' ? 'tab active' : 'tab'} style={{background: '#004080'}}  onClick={() => params.setColor('#004080')}></div>
        <div className={params.color === '#8080FF' ? 'tab active' : 'tab'} style={{background: '#8080FF'}}  onClick={() => params.setColor('#8080FF')}></div>
        <div className={params.color === '#FF0080' ? 'tab active' : 'tab'} style={{background: '#FF0080'}}  onClick={() => params.setColor('#FF0080')}></div>
        <div className={params.color === '#804040' ? 'tab active' : 'tab'} style={{background: '#804040'}}  onClick={() => params.setColor('#804040')}></div>
        <div className={params.color === '#FF8040' ? 'tab active' : 'tab'} style={{background: '#FF8040'}}  onClick={() => params.setColor('#FF8040')}></div>
        <div className="tab text" onClick={() => params.setClear(!params.clear)}>清除画布</div>
      </div>
    </div>
  )
}
