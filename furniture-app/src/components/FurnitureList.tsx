import React from "react";

type Furniture = {
    id : number;
    name : string;
    price : number;
    emoji : string;

};

function FurnitureList(){
    const furnitureItems : Furniture[] = [
        {id : 1, name : '소파', price: 300000, emoji : '🛋️'},
        {id : 2, name : '테이블', price: 150000, emoji : '🪑'},
        {id : 3, name : '침대', price: 500000, emoji : '🛏️'},
        {id : 4, name : '책장', price: 200000, emoji : '📚'},
        {id : 5, name : '의자', price: 80000, emoji : '🪑'},
    ];

    const totalPrice = furnitureItems.reduce((sum, item) => sum + item.price, 0);

    return(
        <div style={{
            padding: '30px',
            border: '2px solid #61dafb',
            borderRadius: '12px',
            margin: '20px',
            backgroundColor : '#1e1e1e'
        }}>
            <h2>가구 목록</h2>

            <div>
                {furnitureItems.map((item) => (
                    <div key = {item.id}
                         style={{
                            border : '1px solid #444',
                            borderRadius: '8px',
                            padding : '15px',
                            margin : '10px 0',
                            display : 'flex',
                            justifyContent : 'space-between',
                            alignItems : 'center'
                         }}
                    >
                        <div style={{display: 'flex', alignItems:'center', gap : '10px'}}>
                            <span style={{fontSize : '32px'}}>{item.emoji}</span>
                            <span style={{fontSize : '20px'}}>{item.name}</span>
                        </div>
                        <span style={{color: '#4CAF50', fontSize : '18px', fontWeight : 'bold'}}>
                            {item.price.toLocaleString()}원
                        </span>
                    </div>
                ))}
            </div>

            <hr style={{margin: '30px 0', borderColor:'#444'}}></hr>
            <h3 style={{color:'#61dafb'}}>
                총 비용 : {totalPrice.toLocaleString()}원
            </h3>

        </div>
    );
}

export default FurnitureList;

