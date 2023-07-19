import React, { createContext, useContext } from "react";

// Initial Value
const CategoryContext = createContext([
    { boardId: 1, name: "자유게시판", path: "free"},
    { boardId: 2, name: "SPRING", path: "spring" },
    { boardId: 3, name: "REACT", path: "react" }
])

// Custom Hook
export const useCategoryContext = () => useContext(CategoryContext);

export default CategoryContext;