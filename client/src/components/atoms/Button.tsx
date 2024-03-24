import React from 'react';

type Props = {
    type: 'button' | 'submit' | 'reset';
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({ onClick, text, type, disabled }: Props) => {
    return (
        <button 
            className={`bg-orange-700 hover:bg-orange-600 text-white text-sm font-normal py-2 px-4 rounded-full focus:outline-none focus:shadow-outline shadow-lg ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
            type={type} 
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;