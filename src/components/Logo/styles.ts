import styled from "styled-components";

export const LogoStyle = styled.div`
  svg {
    align-self: center;
  }

  svg path:nth-child(-n + 5) {
    fill: ${(props) => props.theme.colors.text};
  }
`;
