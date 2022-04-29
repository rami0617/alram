import React from "react";
import styled, { css } from "styled-components";

const VARIANTS = {
  off: css`
    --button-bg-color: #94d82d;
    --button-hover-bg-color: #74b816;
  `,
  delete: css`
    --button-bg-color: #91a7ff;
    --button-hover-bg-color: #5c7cfa;
  `,
  on: css`
    --button-bg-color: #ffc107;
    --button-hover-bg-color: #e0a800;
  `,
};

export default function Button({ onClick, children, variant }) {
  const variantStyle = VARIANTS[variant];

  return (
  <StyledButton
    onClick={onClick}
    variantStyle={variantStyle}
    >
    {children}
  </StyledButton>
  );
}

const StyledButton = styled.button`
  ${(p) => p.variantStyle}

  margin: 0;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  color: var(--button-color, #ffffff);
  background: var(--button-bg-color, #0d6efd);

  &:active,
  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #025ce2);
  }
`;
