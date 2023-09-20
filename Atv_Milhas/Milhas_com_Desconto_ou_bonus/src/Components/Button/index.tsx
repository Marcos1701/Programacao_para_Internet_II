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
            style={style ? style : {
                backgroundColor: "#FFA500",
                color: "#FFF",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                width: "100%"
            }}
        >
            {text ? text : "Button"}
        </button>
    )
}

export default Button