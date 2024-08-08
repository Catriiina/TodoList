import React, {ChangeEvent, useCallback, useState} from "react";
import TextField from '@mui/material/TextField'

type PropsType = {
    value: string,
    isDone?: boolean,
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo( ({ value, isDone, onChange }: PropsType) => {

    console.log('EditableSpan');

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const changeTitleHandler = useCallback ((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    },[])

    const activateEditModeHandler =useCallback( () => {
        setEditMode(true)
    },[])

    const deactivateEditModeHandler = useCallback(() => {
        setEditMode(false)
        onChange(title)
    },[title, onChange])

    return (
        <>
            {editMode ? (
                <TextField
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    autoFocus
                />
            ) : (
                <span className={isDone ? "task-done" : "task"} onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}
)
