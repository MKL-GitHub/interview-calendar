import styled from "styled-components";
import Calendar from "../components/Calendar";
import Container from "../components/Container";

const Main = styled.main`
    display: flex;
    justify-content: center;
`;

const Home = () => {
  return (
    <>
      <Container>
        <Main>
          <Calendar />
        </Main>
      </Container>
    </>
  );
};

export default Home;