import React from "react";
import './Button.css';

type ButtonProps = {
    text: string;
    variant? : 'green' | 'red' | 'blue';
    onClick? :() => void;
};

function Button({text, variant = 'green', onClick} : ButtonProps){
    return (
        <button 
            className= {'btn btn-' + variant}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;