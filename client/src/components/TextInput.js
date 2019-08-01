import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

export default function TextInput(props) {
  return <Input {...props} />;
}
