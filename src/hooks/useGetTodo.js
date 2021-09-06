import { useCallback, useEffect, useState } from 'react';
import Api from '../config/Api';

export default function useGetTodo(todoId) {
    const [todo, setTodo] = useState({});

    const getTodo = useCallback(() => {
        Api.get(`todos/${todoId}`).then((response) => {
            setTodo(response.data.data);
        });
    }, [todoId]);

    useEffect(() => {
        getTodo();
        return () => {
            setTodo({});
        };
    }, [getTodo]);

    return todo;
}
