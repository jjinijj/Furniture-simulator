import React, {useState} from "react";
import common from "../styles/common.module.css"

const FormExample = () =>{
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault(); // 페이지 새로고침 방지

        console.log('제출된 데이터 : ', {name, message});
        setSubmitted(true);

        // 3초 후 초기화
        setTimeout(()=>{
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className={common.box}>
            <h2>Form 제출</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{display:'block', marginBottom:'8px'}}>
                        이름 : 
                    </label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      메시지:
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      required
                      style={inputStyle}
                    />
                </div>
            <button 
                type="submit"
                className="btn btn-green"
                style={{ marginTop: '20px' }}
            >
                제출하기
            </button>
      </form>
      
      {submitted && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#4CAF50',
          borderRadius: '8px'
        }}>
          ✅ 제출 완료!
        </div>
      )}   
        </div>
    );
}

const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  width: '100%',
  borderRadius: '8px',
  border: '1px solid #444',
  backgroundColor: '#2e2e2e',
  color: 'white'
};

export default FormExample;