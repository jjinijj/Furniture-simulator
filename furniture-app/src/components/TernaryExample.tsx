import React, {useState} from 'react';

const TernaryExample = ()=> {
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div style={{padding: '30px', backgroundColor:'#1e1e1e', margin : '20px', borderRadius:'12px'}}>
            <h2>삼항 연산자 예시</h2>

            {isLoggedIn ? (
                <div>
                    <p>로그인 상태</p>
                    <button className='btn btn-red'
                            onClick={()=>setIsLoggedIn(false)}
                    >
                        로그아웃
                    </button>
                </div>
            ) : (
                <div>
                    <p>로그아웃 상태</p>
                    <button className='btn btn-red'
                            onClick={()=>setIsLoggedIn(true)}
                    >
                        로그인
                    </button>
                </div>
            )
            }

        </div>
    );
}

export default TernaryExample;