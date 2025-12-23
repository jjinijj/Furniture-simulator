import React, {useState, useEffect} from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval : NodeJS.Timeout | null = null;

        if(isRunning){
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }

        // cleanup 
        return () => {
            if(interval){
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const reset = () =>{
        setSeconds(0);
        setIsRunning(false);
    };

    return (
        <div style={{
            padding : '30px',
            border: '2px solid #2196F3',
            borderRadius : '12px',
            margin: '20px',
            backgroundColor: '#1e1e1e',
        }}>

            <h2>타이머</h2>
            <p style={{fontSize : '48px', margin:'20px 0'}}>
                {seconds}초
            </p>
            <div>
                <button
                    className = "btn btn-green"
                    onClick = {() => setIsRunning(true)}
                    disabled = {isRunning}
                >
                    시작
                </button>
                <button
                    className="btn btn-red"
                    onClick={() => setIsRunning(false)}
                    disabled = {!isRunning}
                >
                    정지
                </button>
                <button
                    className='btn btn-blue'
                    onClick={reset}
                >
                    리셋
                </button>
            </div>
        </div>
    );
}

export default Timer;