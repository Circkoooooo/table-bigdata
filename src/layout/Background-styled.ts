import styled from "styled-components";

const BackgroundConfig = {
  headerHeight: "64px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
};

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  background-color: #fff;
  width: 100%;
  height: ${BackgroundConfig.headerHeight};
  border-bottom: ${BackgroundConfig.border};
`;

export const Main = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
`;

export const Aside = styled.div`
  background: #fff;
  min-width: 300px;
  height: 100%;
  border-right: ${BackgroundConfig.border};
`;

export const Content = styled.div`
  overflow: auto;
  margin: 5px;
  display: flex;
`;
