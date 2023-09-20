import React from 'react'

interface InputProps {
    Initialvalue?: string | number | readonly string[] | undefined
    placeholder?: string
    onClick?: () => void
    disabled?: boolean
    type?: "text" | "password" | "email" | "number" | "date"
    className?: string
    id: string
    style?: React.CSSProperties
    min?: number
    max?: number
}


const Input = (
    { Initialvalue: Initialtext, placeholder, onClick, disabled, type, className, id, style, min = 0, max }: InputProps
) => {
    return (
        <input
            placeholder={placeholder ? placeholder : "Digite aqui"}
            onClick={onClick}
            disabled={disabled ? disabled : false}
            type={type ? type : "text"}
            className={className ? className : ""}
            id={id}
            style={style ? style : {
                backgroundColor: "#FFF",
                color: "#000",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                width: "100%"
            }}
            value={Initialtext ? Initialtext : ""}
            min={type === "number" ? min : undefined}
            max={type === "number" ? max : undefined}
        />
    )
}

export default Input