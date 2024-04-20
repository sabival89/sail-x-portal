import tw from "twin.macro";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { useState } from "react";

const SailX = () => {
  const [route, setRoute] = useState<string | undefined>(
    location.hash.includes("historical") ? "historical_prices" : undefined
  );

  return (
    <Container>
      <Nav route={route} setRoute={setRoute} />
      <Main route={route} setRoute={setRoute} />
    </Container>
  );
};
export default SailX;

const Container = tw.div`flex h-screen `;
