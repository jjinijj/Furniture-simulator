import React from "react";

type FurnitureCardProps ={
    name : string;
    price : number;
    emoji : string;
};

function FurnitureCard(props: FurnitureCardProps){
    return(
        <div style = {{
            border: '2px, solid #61dafb',
            borderRadius: '12px',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#1e1e1e',
            color: 'white',
        }}>
            <h2> {props.emoji} {props.name}</h2>
            <p style={{
                fontSize: '24px',
                color : '#4CAF50'
            }}>
            </p>
        </div>
    );
}

export default FurnitureCard;