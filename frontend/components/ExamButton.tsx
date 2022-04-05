/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

const styledOutlineBtn = css`
  margin-right: 15px;
  min-width: 80px;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  line-height: 20px;
  transition: all 0.18s ease-in-out 0s;
  outline: 0px;
  cursor: pointer;
  border: 1px solid rgb(69, 90, 100);
  color: rgb(69, 90, 100);
  background: transparent;
  box-shadow: none;
  height: 32px;
  padding: 10px 16px;
  font-size: 13px;
  border-color: #b0bec5;
  &:hover {
    border-color: #263238;
    color: #263238;
    background-color: #eceff1;
  }
`;

const styledFilledBtn = css`
  display: inline-flex;
  vertical-align: middle;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 3px;
  line-height: 20px;
  transition: all 0.18s ease-in-out 0s;
  outline: 0px;
  cursor: pointer;
  border: 0px;
  color: rgb(255, 255, 255);
  background: rgb(69, 90, 100);
  box-shadow: rgb(38 50 56 / 20%) 0px 0px 0px 1px inset;
  height: 32px;
  padding: 10px 16px;
  font-size: 13px;
  margin-right: 20px;
  &:hover {
    border: none;
    color: rgb(255, 255, 255);
    background: rgb(84, 110, 122);
  }
`;

interface ExamButtonProps {
  onClick?: () => void;
  style?: "filled" | "outlined";
}

const ExamButton: FC<ExamButtonProps> = ({
  style = "filled",
  onClick,
  children,
}) => {
  return (
    <button
      css={style === "filled" ? styledFilledBtn : styledOutlineBtn}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ExamButton;
