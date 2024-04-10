import React, {ChangeEvent, useState} from "react";

type PropsType = {
    value: string,
    isDone?: boolean,
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({ value, isDone, onChange }: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    return (
        <>
            {editMode ? (
                <input value={title}
                       onChange={changeTitleHandler}
                       onBlur={deactivateEditModeHandler}
                       autoFocus />
            ) : (
                <span className={isDone ? "task-done" : "task"} onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}

