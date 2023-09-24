import React from 'react'

interface ButtonProps {
    text: string
    onClick?: () => void
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    className?: string
    id: string
    style?: React.CSSProperties
}

const Button = ({ text, onClick, disabled, type, className, id, style }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled ? disabled : false}
            type={type ? type : "button"}
            className={className ? className : ""}
            id={id}
            style={style}
        >
            {text ? text : "Button"}
        </button>
    )
}

export default Button