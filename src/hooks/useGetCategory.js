import { useState, useCallback, useEffect } from "react";
import Api from "../config/Api";

export default function useGetCategory(categoryId) {
    let [category, setCategory] = useState({});

    const getCategory = useCallback(() => {
        Api.get(`categories/${categoryId}`)
        .then(response => {
            setCategory(response.data.category);
        });
    }, [categoryId]);

    useEffect(() => {
        getCategory();
        return () => {
            setCategory({});
        };
    }, [getCategory]);

    return category;
}