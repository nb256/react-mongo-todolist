import React from "react";
import TodoList from "./components/TodoList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

function App() {
  return (
    <Container>
      <TodoList />
    </Container>
  );
}

export default App;
