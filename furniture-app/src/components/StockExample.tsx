import exp from "constants";
import React, {useState} from "react";

type Furniture = {
    id : number;
    name : string;
    price : number;
    stock : number;
    emoji : string;
}

function StockExample() {
  const [furniture] = useState<Furniture[]>([
    { id: 1, name: '소파', price: 300000, stock: 5, emoji: '🛋️' },
    { id: 2, name: '테이블', price: 150000, stock: 0, emoji: '🪑' },
    { id: 3, name: '침대', price: 500000, stock: 2, emoji: '🛏️' },
    { id: 4, name: '책장', price: 200000, stock: 0, emoji: '📚' },
  ]);

  return(
    <div style={{padding: '30px', backgroundColor :'#1e1e1e', margin : '20px', borderRadius : '12px'}}>
        <h2>가구 재고 시스템</h2>

        <div>
            {furniture.map((item) => (
                <div key = {item.id}
                     style={{
                        border: '1px solid #444',
                        borderRadius: '8px',
                        padding : '15px',
                        margin: '10px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems:'center'
                     }}
                >
                    <div style={{display:'flex', alignItems:'center', gap: '15px'}}>
                        <span style={{fontSize:'32px'}}>{item.emoji}</span>
                        <div>
                            <div style={{fontSize : '20px'}}>{item.name}</div>
                            <div style={{color: '#4CAF50', fontSize:'16px'}}>{item.price.toLocaleString()}원{item.name}</div>
                        </div>
                    </div>

                    <div>
                         {item.stock > 0 ? (
                            <div>
                                <span style={{color:'#4CAF50'}}>
                                    재고 : {item.stock}개
                                </span>
                                <button className="btn btn-green"
                                        style={{margin:'10px', padding : '8px 16px'}}
                                >구매하기</button>
                            </div>

                         ) : (
                            <div>
                                <span style={{color:'#f44336'}}>
                                    품절
                                </span>
                                <button className="btn btn-blue"
                                        style={{margin:'10px', padding : '8px 16px'}}
                                >재입고 알림</button>
                            </div>
                         )}

                         {item.stock > 0 && item.stock <= 2 &&(
                            <div style={{color:'#ff9800', fontSize : '14px', margin:'5px'}}>
                                재고가 얼마 남지 않았습니다.
                            </div>
                         )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default StockExample;