import React from "react";
import { css } from "@emotion/core";

const inputStyles = css`
  border: 0;
  padding: 0;
  display: block;
  appearance: none;
`;

const labelStyles = css`
  display: block;
`;

const fieldStyles = css`
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const accessiblyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1;
  margin: -1;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1;
`;

export default function Input({
  disabled,
  labelText,
  type,
  id,
  name,
  handleChange,
  labelIsHidden,
  styles,
}) {
  const isHidden = labelIsHidden ? accessiblyHidden : labelStyles;
  return (
    <fieldset disabled={disabled} css={[fieldStyles, styles]}>
      <label htmlFor={id} css={isHidden}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={handleChange}
        css={inputStyles}
      />
    </fieldset>
  );
}
