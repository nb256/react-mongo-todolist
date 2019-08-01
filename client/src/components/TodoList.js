import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import TodoItemModal from "./TodoItemModal";
import TodoItem from "./TodoItem";

import getTodoItems from "../actions/getTodoItems";
import createTodoItem from "../actions/createTodoItem";
import updateTodoItem from "../actions/updateTodoItem";
import deleteTodoItem from "../actions/deleteTodoItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function TodoList() {
  const [list, setList] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [itemToBeUpdated, setItemToBeUpdated] = useState({});

  useEffect(() => {
    getTodoItems().then(items => setList(items));
  }, []);

  const createTodo = async item => {
    const response = await createTodoItem(item);
    setList(response);
    setCreateModalOpen(false);
  };

  const updateTodo = async todoItem => {
    const updatedItems = await updateTodoItem(todoItem);
    setList(updatedItems);
    setUpdateModalOpen(false);
  };
  const deleteTodo = async ({ _id }) => {
    const updatedItems = await deleteTodoItem({ _id });
    setList(updatedItems);
  };

  return (
    <>
      <TodoItemModal
        show={createModalOpen}
        onModalClose={() => setCreateModalOpen(false)}
        onFormSend={createTodo}
      />
      <TodoItemModal
        show={updateModalOpen}
        onModalClose={() => setUpdateModalOpen(false)}
        onFormSend={updateTodo}
        todoItem={itemToBeUpdated}
      />
      <Button onClick={() => setCreateModalOpen(true)}>Create Item</Button>
      <Container>
        {list.map(item => (
          <TodoItem
            key={item._id}
            {...item}
            updateTodoItem={updateTodo}
            openUpdateModal={todoItem => {
              setItemToBeUpdated(todoItem);
              setUpdateModalOpen(true);
            }}
            deleteTodoItem={deleteTodo}
          />
        ))}
      </Container>
    </>
  );
}
