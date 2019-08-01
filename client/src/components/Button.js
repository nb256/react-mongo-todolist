import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 8px 12px;
  max-width: 250px;
`;

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
