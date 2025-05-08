import styled from "styled-components";

export const Container = styled.section`
  width: 100dvw;
  height: 100dvh;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Card = styled.form`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 32px 20px;
  gap: 20px;
`;

export const TitleCard = styled.h2`
  font-size: 32px;
  color: #176975;
  margin: 0;
  text-align: center;
`;

export const RowItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 4px;
  color: #1da5bb;
  font-weight: 700;
  font-size: 16px;
`;

export const Input = styled.input`
  border: 2px solid #808080;
  outline: none;
  padding: 8px 12px;
  border-radius: 12px;
  color: #444444;
  font-size: 14px;

  &:focus {
    border-color: #1da5bb;
  }
`;

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

export const Paragraph = styled.p`
  font-size: 14px;
  color: #444444;
  text-align: center;

  span {
    color: #1da5bb;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 8px;
  }
`;
