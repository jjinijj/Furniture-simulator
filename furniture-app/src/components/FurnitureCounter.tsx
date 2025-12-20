import React, {useState} from 'react';

function FurnitureCounter(){
    const [sofaCount, setSofaCount] = useState(0);
    const [tableCount, setTableCount] = useState(0);
    const [bedCount, setBedCount] = useState(0);

    const resetAll = () =>{
        setSofaCount(0);
        setTableCount(0);
        setBedCount(0);
    };

    const totalCount = sofaCount + tableCount + bedCount;

    return (
        <div style={{
            padding :'30px',
            border: '2px solid #4CAF50',
            borderRadius:'12px',
            margin:'20px',
            backgroundColor:'#1e1e1e',
        }}>
        
            <h2>가구 카운터</h2>
            <div style={{marginTop:'20px'}}>
                <p> 소파 : {sofaCount}개</p>
                <button
                    className = "btn btn-green"
                    onClick = {() => setSofaCount(sofaCount + 1)}
                    >
                        소파 추가
                </button>
            </div>
            <div style={{marginTop:'20px'}}>
                <p> 테이블 : {tableCount}개</p>
                <button
                    className = "btn btn-green"
                    onClick = {() => setTableCount(tableCount + 1)}
                    >
                        테이블 추가
                </button>
            </div>
            <div style={{marginTop:'20px'}}>
                <p> 침대 : {bedCount}개</p>
                <button
                    className = "btn btn-green"
                    onClick = {() => setBedCount(bedCount + 1)}
                    >
                        침대 추가
                </button>
            </div>

            <hr style = {{margin: '30px 0', borderColor:'#444'}}></hr>
            <h3>총 가구 : {totalCount}개</h3>

            <button 
                className = "btn btn-red"
                onClick={resetAll}
            >
                전체 리셋
            </button>
        </div>
    );
}

export default FurnitureCounter;

