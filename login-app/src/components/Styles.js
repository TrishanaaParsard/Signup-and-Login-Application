import styled from "styled-components";

//Background
import bg from "./../assets/bg.png";

// React router
import { Link } from "react-router-dom";

export const colors = {
  primary: "#fff",
  theme: "#424547",
  light1: "#F3F4F6",
  light2: "#E5E7EB",
  dark1: "#1F2937",
  dark2: "#4B5563",
  dark3: "#9CA3AF",
  red: "#DC2626",
};

//Styled components
export const StyledContainer = styled.div`
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`;

//Home
export const StyledTitle = styled.h2`
  font-size: ${(props) => props.size}px;
  text-align: center;
  color: ${(props) => (props.color ? props.color : colors.primary)};
  padding: 5px;
  margin-bottom: 20px;
`;

export const StyledSubTitle = styled.p`
  font-size: ${(props) => props.size}px;
  text-align: center;
  color: ${(props) => (props.color ? props.color : colors.primary)};
  padding: 5px;
  margin-bottom: 20px;
`;

export const Avatar = styled.div`
    width: 100%;
    height: 85px;
    border-radius: 50px;
    background-image; url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;

export const StyledButton = styled(Link)`
  padding: 10px;
  width: 150px;
  background-color: transparent;
  font-size: 16px;
  border: 3px solid ${colors.primary};
  border-radius: 25px;
  color: ${colors.primary};
  text-decoration: none;
  text-align: center;
  transition: ease-in-out 0.3s;
  outline: 0;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.theme};
    cursor: pointer;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 25px;
`;

//Input
export const StyledTextInput = styled.input`
  width: 280px;
  padding: 15px;
  padding-left: 50px;
  font-size: 17px;
  leter-spacing: 1px;
  background-color: ${(props) => props.bg || colors.light2};
  color: ${colors.text};
  border: 0;
  display: block;
  margin: 5px auto 10px auto;
  transition: ease-in-out 0.3s;
  outline: 0;

  ${(props) =>
    props.invalid &&
    `background-color: ${colors.red}; color: ${colors.primary};`}

  &focus {
    background-color: ${colors.dark2};
    color: ${colors.primary};
  }
`;

export const StyledLabel = styled.p`
  text-align: left;
  font-size: 13px;
  fon-weight: bold;
`;

export const StyledFormArea = styled.div`
  background-color: ${(props) => props.bg || colors.primary};
  text-align: center;
  padding: 45px 55px;
`;

export const StyledFormButton = styled.button`
  padding: 10px;
  width: 150px;
  background-color: transparent;
  font-size: 16px;
  border: 3px solid ${colors.theme};
  border-radius: 25px;
  color: ${colors.theme};
  transition: ease-in-out 0.3s;
  outline: 0;

  &:hover {
    background-color: ${colors.theme};
    color: ${colors.primary};
    cursor: pointer;
  }
`;

export const ErrorMsg = styled.div`
  font-size: 12px;
  color: ${colors.red};
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: center;
`;

export const ExtraText = styled.p`
  font-size: ${(props) => props.size}px;
  text-align: center;
  color: ${(props) => (props.color ? props.color : colors.dark2)};
  padding: 2px;
  margin-top: 10px;
`;

export const TextLink = styled(Link)`
  text-decoration: none;
  color: ${colors.theme};
  transition: ease-in-out 0.3s;

  &:hover {
    text-decoration: underline;
    leter-spacing: 2px;
    font-weight: bold;
    color: ${colors.theme};
  }
`;

//Icons
export const StyledIcon = styled.p`
  color: ${colors.dark1};
  position: absolute;
  font-size: 21px;
  top: 35px;
  ${(props) => props.right && `right: 15px;`}
  ${(props) => !props.right && `left: 15px`}
`;

// copyright
export const CopyRightText = styled.p`
  font-size: 20px;
  padding: 5px;
  margin: 20px;
  text-align: center;
  color: ${colors.light2};
`;
