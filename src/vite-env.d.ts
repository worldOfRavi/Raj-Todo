/// <reference types="vite/client" />

// Todo type---- no need to export and also we will be able to use it in other pages without importing it.
 type TodoItemType = {
    title:string;
    isCompleted:boolean;
    id:string;
}