import React from "react";

type ButtonPropsType = {
    title: string
    onClick?:()=>void
    isDisabled?: boolean
    classes?: string
}
export const MyButton = ({title,isDisabled,classes, onClick}: ButtonPropsType) => {
    return (
        <button className={classes} disabled={isDisabled} onClick={onClick}>
            {title}
        </button>
    )
}
