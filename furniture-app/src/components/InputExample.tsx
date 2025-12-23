import React, {useState} from "react";
import common from '../styles/common.module.css';

const InputExample = () => {
    const [text, setText] = useState('');

    return (
        <div className={common.box}
        >
            <h2>Input 예시</h2>
            <input
                type = "text"
                value = {text}
                onChange={(e) => {setText(e.target.value)}}
                placeholder="여기에 입력하세요"
                style={{
                    padding: '12px',
                    fontSize: '16px',
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #444',
                    backgroundColor: '#2e2e2e',
                    color: 'white',
                    marginTop: '10px'
                }}
            >    
            </input>

            <p style={{marginTop : '20px', fontSize : '18px'}}>
                입력한 내용 : {text}
            </p>
            <p style={{color: '#888', fontSize:'14px'}}>
                글자 수 = {text.length}
            </p>
        </div>
    );
}

export default InputExample;