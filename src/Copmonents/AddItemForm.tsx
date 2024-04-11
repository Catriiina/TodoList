import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                label="Enter a title"
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={title}
                size={'small'}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
        </div>
    )
}