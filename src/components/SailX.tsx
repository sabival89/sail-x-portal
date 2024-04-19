import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import tw from "twin.macro";
import Main from "./Main";
import Nav from "./Nav";

const SailX = () => {
  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["historicPrices"],

    queryFn: async () =>
      await axios
        .get("http://localhost:3001/sailx/spy", {
          params: { date_range: "ytd" },
        })
        .then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log({ data, isLoading });
  return (
    <Container>
      <Nav />
      <Main />
    </Container>
  );
};
export default SailX;

const Container = tw.div`flex h-screen`;
