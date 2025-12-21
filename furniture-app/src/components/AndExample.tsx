import React, {useState} from "react";

const AndExample = () =>{
    const [showMessage, setShowMessage] = useState(false);
    const [itemCount, setItemCount] = useState(0);

    return(
        <div style={{padding: '30px', backgroundColor:'#1e1e1e', margin:'20px', borderRadius:'12px'}}>
            <h2>&&연산자 예시</h2>

            <button className="btn btn-blue"
                    onClick={()=> setShowMessage(!showMessage)}
            >
                메시지 {showMessage ? '숨기기' : '보이기'}
            </button>
        {showMessage &&(
            <p style={{marginTop:'20px', color:'#4CA50'}}>
                메시지가 나타났다!
            </p>
        )}

        <hr style={{margin:'30px 0', borderColor:'#444'}}></hr>
        
        <div>
            <button className="btn btn-green"
                    onClick={()=>setItemCount(itemCount + 1)}>
                아이템 추가
            </button>
            <button className="btn btn-red"
                    onClick={()=>setItemCount(0)}>
                초기화
            </button>
        </div>

        <p style={{marginTop:'20px'}}>현재 아이템 : {itemCount}개</p>

        { itemCount > 0 &&(
            <p style={{color : '#61dafb'}}>
                아이템이 있습니다
            </p>
        )}

        { itemCount > 5 &&(
            <p style={{color : '#ff9800'}}>
                아이템이 5개 이상입니다
            </p>
        )}
        </div>
    );
}

export default AndExample;