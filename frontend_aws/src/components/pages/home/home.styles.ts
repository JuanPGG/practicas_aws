import styled from "styled-components";

export const Button = styled.button`
  outline: none;
  border: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 2px solid transparent;
  background-color: #1da5bb;
  color: #ffffff;
  cursor: pointer;
  transition: all 300ms ease;
  font-weight: 700;

  &:hover {
    border-color: #1da5bb;
    color: #1da5bb;
    background-color: #ffffff;
  }
`;