import React, {useState} from "react";

const ConditionalExample = () => {
    const [isLogginIn, setIsLoggedIn] = useState(false);

    // if-else
    if(isLogginIn){
        return(
            <div style={{padding: '30px', backgroundColor :'#1e1e1e', margin:'20px', borderRadius:'12px'}}>
                <h2>환영합니다.</h2>
                <p>로그인 상태입니다</p>
                <button className = "btn btn-red"
                        onClick={()=>setIsLoggedIn(false)}
                >
                    로그아웃
                </button>
            </div>
        );
    }

    return(
            <div style={{padding: '30px', backgroundColor :'#1e1e1e', margin:'20px', borderRadius:'12px'}}>
                <h2>로그인이 필요합니다.</h2>
                <p>서비스를 이용하려면 로그인하세요.</p>
                <button className = "btn btn-red"
                        onClick={()=>setIsLoggedIn(true)}
                >
                    로그인
                </button>
            </div>
    );
}

export default ConditionalExample;