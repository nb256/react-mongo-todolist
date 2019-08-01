import React from "react";
import styled, { css } from "styled-components";
import { distanceInWordsToNow, isAfter } from "date-fns";

import Button from "./Button";
import editIcon from "../media/edit.svg";
import deleteIcon from "../media/delete.svg";

const Container = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Text = styled.div`
  font-size: 1.2em;
  transition: text-decoration 1s ease;
  text-decoration: ${props => (props.completed ? " line-through" : "none")};
  padding: 0px 10px;
`;
const StatusText = styled.div`
  font-size: 0.9em;
  padding: 0px 10px;

  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

const ActionIcons = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;

const ActionIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05, 1.05);
  }
  margin: 5px;
`;

export default function TodoItem({
  _id,
  content,
  deadline,
  status,
  updateTodoItem,
  openUpdateModal,
  deleteTodoItem
}) {
  return (
    <Container>
      <Text
        completed={status === "completed"}
        title={status !== "completed" ? "Incompleted" : "Completed"}
      >
        {content}
      </Text>
      <StatusText
        color={isAfter(new Date(deadline), new Date()) ? "green" : "red"}
      >
        {deadline &&
          distanceInWordsToNow(new Date(deadline), { addSuffix: true })}
      </StatusText>
      <Button
        onClick={() => {
          updateTodoItem({
            _id,
            content,
            deadline,
            status: status === "completed" ? "incomplete" : "completed"
          });
        }}
      >
        {status === "completed" ? "Incomplete" : "Complete"}
      </Button>
      <ActionIcons>
        <ActionIcon
          src={editIcon}
          title="Edit Item"
          onClick={() => {
            openUpdateModal({
              _id,
              content,
              deadline
            });
          }}
        />
        <ActionIcon
          src={deleteIcon}
          title="Delete Item"
          onClick={() => {
            if (window.confirm("Are you sure to delete item?")) {
              deleteTodoItem({ _id });
            }
          }}
        />
      </ActionIcons>
    </Container>
  );
}
