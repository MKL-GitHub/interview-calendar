import styled from "styled-components";

const ContainerWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      {children}
    </ContainerWrapper>
  );
};

export default Container;