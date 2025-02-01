import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
type PropType = {
  todo: TodoItemType;
  completeHandler: (id: TodoItemType["id"]) => void; //can get the type by either of two way
  deleteHandler: (id: string) => void;
  editHandler: (id: string, title: string) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  return (
    <Paper sx={{ padding: "1rem" }} variant="elevation">
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal !== "") {
                editHandler(todo.id, textVal);
                setEditActive((prev) => !prev);
              }
            }}
          />
        ) : (
          <Typography variant="body1" sx={{ flexGrow: 1, textDecoration:todo.isCompleted ? "line-through":"none" }}>
            {todo.title}
          </Typography>
        )}

        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button onClick={() => setEditActive((prev) => !prev)}>
          <EditIcon />
        </Button>
        <Button onClick={() => deleteHandler(todo.id)}>
          <DeleteIcon />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
