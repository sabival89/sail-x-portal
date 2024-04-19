import tw from "twin.macro";
import Nav from "./components/Nav";
import Main from "./components/Main";

const SailX = () => {
  return (
    <Container>
      <Nav />
      <Main />
    </Container>
  );
};
export default SailX;

const Container = tw.div`flex h-screen`;
