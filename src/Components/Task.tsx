import React, {memo, useCallback} from 'react';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from './EditableSpan';
import { getListItemSx } from '../TodoList/Todolist.styles';
import ListItem from "@mui/material/ListItem";

type TaskPropsType = {
    id: string;
    title: string;
    isDone: boolean;
    onStatusChange: (taskId: string, taskStatus: boolean) => void;
    onTitleChange: (taskId: string, title: string) => void;
    onTaskRemove: (taskId: string) => void;
};

export const Task = memo(({
                              id,
                              title,
                              isDone,
                              onStatusChange,
                              onTitleChange,
                              onTaskRemove
                          }: TaskPropsType) => {
    const handleTaskStatusChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onStatusChange(id, e.currentTarget.checked);
    },[id, onStatusChange])

    const handleTaskTitleChange = useCallback((newTitle: string) => {
        onTitleChange(id, newTitle);
    },[id, onTitleChange])

    const handleTaskRemove = useCallback(() => {
        onTaskRemove(id);
    },[id, onTaskRemove])

    return (
        <ListItem sx={getListItemSx(isDone)}>
            <div>
                <Checkbox
                    checked={isDone}
                    onChange={handleTaskStatusChange}
                />
                <EditableSpan
                    value={title}
                    isDone={isDone}
                    onChange={handleTaskTitleChange}
                />
            </div>
            <IconButton aria-label="удалить" size="small" onClick={handleTaskRemove}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </ListItem>
    );
});