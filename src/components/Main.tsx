import tw from "twin.macro";
import Historical from "../Pages/Historical";
import { Dispatch, SetStateAction } from "react";

const Main = ({
  route,
}: {
  route?: string;
  setRoute: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <Container>
      <ContentWrapper>
        {route?.includes("historical_prices") ? <Historical /> : null}
      </ContentWrapper>
    </Container>
  );
};

export default Main;

const Container = tw.main`flex flex-col items-center w-full`;

const ContentWrapper = tw.div`flex flex-col justify-center w-11/12`;
