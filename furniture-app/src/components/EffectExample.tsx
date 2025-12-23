import React, {useState, useEffect} from 'react'

const EffectExample = ()=>{
    const [count, setCount] = useState(0);
    const [name, setName] = useState('진');

    // 패턴 1. 처음 한 번만 실행
    useEffect(() => {
        console.log('컴포넌트가 시작되었습니다.');
    }, []);

    // 패턴 2. count 변경 시마다 실행
    useEffect(() => {
        console.log('count가 변경됨 : ', count);
    }, [count]);

    // 패턴 3 : name 변경 시마다 실행
    useEffect(() => {
        console.log('name이 변경 됨 : ', name);
    }, [name])

    // count 변경 시마다 브라우저 제목 업데이트
    useEffect(() => {
        document.title = `Count : ${count}`;
    }, [count])

    return (
        <div style={{
            padding : '30px',
            border : '2px solid #61dafb',
            borderRadius: '12px',
            margin: '28p',
            backgroundColor : '#1e1e1e'
        }}>

            <h2>useEffect 예시</h2>

            <div style={{marginTop : '20px'}}>
                <p style={{fontSize: '24px'}}> Count : {count}</p>
                <button
                    className='btn btn-green'
                    onClick={()=>(setCount(count +1))}>
                Count 증가
                </button>
            </div>

            <div style={{marginTop : '20px'}}>
                <p style={{fontSize: '24px'}}> 이름 : {name}</p>
                <button
                    className='btn btn-blue'
                    onClick={()=>(setName(name == '진' ?  '철': '진'))}>
                이름 변경
                </button>
            </div>

            <p style={{ marginTop: '30px', color: '#888', fontSize: '14px' }}>
    💡          개발자 도구 Console을 확인하세요!
            </p>

        </div>
    );
}

export default EffectExample;