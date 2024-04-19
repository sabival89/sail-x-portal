import tw from "twin.macro";
import Table from "../components/Table";

const Alpha = () => {
  return (
    <div>
      <Caption>
        <h1>Alpha </h1>
        <p>
          Shows the alpha of the ticker vs. the benchmark over the time period
          requested
        </p>
      </Caption>

      <TableWrapper>
        <Table />
      </TableWrapper>
    </div>
  );
};

export default Alpha;

const TableWrapper = tw.div`relative bg-black p-5 rounded-3xl min-h-32`;

const Caption = tw.div`px-2 py-6 [& h1]:(text-3xl font-bold text-gray-200) [& p]:(text-gray-500 font-light py-1)`;
