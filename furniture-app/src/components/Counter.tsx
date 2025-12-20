import React, {useState} from "react";

function Counter(){
    // State 선언
    const[count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
    };

    const decrease = () =>{
        setCount(count -1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div style={{
            padding: '30px',
            border: '2px solid #61dafb',
            borderRadius: '12px',
            margin: '20px',
            backgroundColor: '#1e1e1e'
        }}>
            <h2>카운터</h2>
            <p style={{fontSize:'48px', margin:'20px 0'}}>
                {count}
            </p>
            <div>
                <button 
                  className="btn btn-green"
                  onClick={increase}
                >
                  증가 ➕
                </button>
                <button 
                  className="btn btn-red"
                  onClick={decrease}
                >
                  감소 ➖
                </button>
                <button 
                  className="btn btn-blue"
                  onClick={reset}
                >
                  리셋 🔄
                </button>
            </div>

        </div>

    );
}

export default Counter;