import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "../../utils/features";
const TodoList = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<string>("");

  const completeHandler = (id: TodoItemType["id"]): void => {
    const updatedTodo:TodoItemType[] = todos.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
        
      }
      return item
    });
    setTodos(updatedTodo);
  };

  const editHandler = (id: TodoItemType["id"],title: TodoItemType["title"]): void => {
    console.log(id, title);
    
    const updatedTodo:TodoItemType[] = todos.map((item) => {
      if (item.id === id) {
        item.title = title
      }
      return item
    });
    setTodos(updatedTodo);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const remainedTodos:TodoItemType[] = todos.filter((item)=>item.id !== id);
    setTodos(remainedTodos);
   };

  const handleAddTodo = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  // when ever todes value get changed it will be saved in localstorage
  useEffect(()=>{
    saveTodos(todos);
  },[todos])

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <Button variant="contained" color="success">
            raj
          </Button>
        </Toolbar>
      </AppBar>
      <Stack height={"75%"} direction={"column"} spacing={"1rem"} p={"1rem"} sx={{overflow:"auto"}}>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))}
      </Stack>
      <TextField
        variant="outlined"
        fullWidth
        label={"New Task"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") handleAddTodo();
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        sx={{ margin: "10px 0" }}
        disabled={title === ""}
        fullWidth
        variant="contained"
        onClick={handleAddTodo}
      >
        Add
      </Button>
    </Container>
  );
};

export default TodoList;
