import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import TextInput from "./TextInput";
import Button from "./Button";

import "react-datepicker/dist/react-datepicker.css";

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  /* style date picker */
  .react-datepicker__input-container {
    input {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
    }
  }
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
const Form = styled.form`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default function TodoItemModal({
  show,
  todoItem = {},
  onFormSend,
  onModalClose
}) {
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    if (todoItem._id) {
      setContent(todoItem.content);
      setDeadline(todoItem.deadline && new Date(todoItem.deadline)) ||
        new Date();
    }
  }, [todoItem]);

  const submitForm = e => {
    e.preventDefault();
    if (onFormSend)
      onFormSend({
        _id: todoItem._id,
        content,
        deadline,
        status: todoItem.status
      });
    setContent("");
    setDeadline(new Date());
  };

  const handleDateChange = e => {
    setDeadline(e);
  };
  return (
    show && (
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={() => onModalClose && onModalClose()}>
            &times;
          </CloseButton>
          <Form onSubmit={submitForm}>
            <label>What to do?</label>
            <TextInput
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <label>Deadline</label>

            <DatePicker
              selected={deadline}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
            <ButtonContainer>
              <Button>{todoItem.content ? "Update" : "Create"}</Button>
            </ButtonContainer>
          </Form>
        </ModalContent>
      </ModalContainer>
    )
  );
}
