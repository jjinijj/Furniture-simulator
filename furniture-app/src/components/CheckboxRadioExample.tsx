import React, {useState} from "react";
import common from '../styles/common.module.css'

const CheckboxRadioExample = () => {
    const [agreed, setAgreed] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');

    return (
        <div className={common.box}>
            <h2>체크박스 & 라디오</h2>

            {/* 체크박스 */}
            <div style={{marginTop : '20px'}}>
                <label style={{display : 'flex', alignContent:'center', cursor:'pointer'}}>
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e)=>setAgreed(e.target.checked)}
                        style={{width:'20px', height:'20px', marginRight:'10px'}}
                        />
                        <span>동의합니다</span>
                </label>
                <p style={{marginTop: '10px', color:agreed ?  '#4CAF50' : '#f44336'}}>
                    {agreed ? '동의함' : '동의안함'}
                </p>
            </div>

            {/*라디오 버튼*/}
            <div style={{marginTop:'30px'}}>
                <h3>좋아하는 색상</h3>

                <label style={{display:'block', marginTop:'10px', cursor:'pointer'}}>
                    <input 
                        type = "radio"
                        value="red"
                        checked={selectedColor === 'red'}
                        onChange={(e)=> setSelectedColor(e.target.value)}
                        style={checkBoxStyle}
                    />
                    빨강
                </label>

                <label style={{display:'block', marginTop:'10px', cursor:'pointer'}}>
                    <input 
                        type = "radio"
                        value="blue"
                        checked={selectedColor === 'blue'}
                        onChange={(e)=> setSelectedColor(e.target.value)}
                        style={checkBoxStyle}
                    />
                    파랑
                </label>

                <label style={{display:'block', marginTop:'10px', cursor:'pointer'}}>
                    <input 
                        type = "radio"
                        value="green"
                        checked={selectedColor === 'green'}
                        onChange={(e)=> setSelectedColor(e.target.value)}
                        style={checkBoxStyle}
                    />
                    초록
                </label>

                <p style={{marginTop : '15px'}}>
                    선택한 색상 : {selectedColor || '선택 안 됨'}
                </p>
            </div>
        </div>
    );
}

const checkBoxStyle = {
    name :"color",
    marginRight : '10px'
}

export default CheckboxRadioExample;