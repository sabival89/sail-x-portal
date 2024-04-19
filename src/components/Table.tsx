import { CgSpinner } from "react-icons/cg";
import { TbDatabaseSearch } from "react-icons/tb";
import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";

const Table = () => {
  return (
    <div>
      <Row>
        <Column>
          <h3>Symbol</h3>
          <Symbol index={5}>SPY</Symbol>
        </Column>
        <Column>
          <h3>Open</h3>
          <span>501.98</span>
        </Column>
        <Column>
          <h3>Close</h3>
          <span>499.52</span>
        </Column>
        <Column>
          <h3>Price Date</h3>
          <span>2024-04-18</span>
        </Column>
        <Column>
          <h3>Earnings</h3>
          <span>-0.20577</span>
        </Column>
      </Row>
      <Row>
        <Column>
          <h3>Symbol</h3>
          <Symbol index={7}>PPLP</Symbol>
        </Column>
        <Column>
          <h3>Open</h3>
          <span>501.98</span>
        </Column>
        <Column>
          <h3>Close</h3>
          <span>499.52</span>
        </Column>
        <Column>
          <h3>Price Date</h3>
          <span>2024-04-18</span>
        </Column>
        <Column>
          <h3>Earnings</h3>
          <EarningText isNegative={false}>-0.20577</EarningText>
        </Column>
      </Row>

      {/* <Loader>
        <CgSpinner className="animate-spin h-20 w-20 mr-3 text-gray-700" />
      </Loader>

      {/*  <Empty>
        <TbDatabaseSearch className="h-20 w-20 mr-3 text-gray-700" />
        <p>No Data Found</p>
      </Empty> */}
    </div>
  );
};

export default Table;

const textColors: Array<TwStyle> = [
  tw`text-green-500!`,
  tw`text-purple-500!`,
  tw`text-blue-500!`,
  tw`text-orange-500!`,
  tw`text-violet-500!`,
  tw`text-pink-500!`,
  tw`text-yellow-500`!,
  tw`text-cyan-500!`,
];

const Row = tw.ul`flex bg-gray-900 justify-between  overflow-hidden hover:(bg-gray-900/90) not-first-of-type:(rounded-b-lg ) not-last-of-type:(border-b border-black rounded-t-lg)`;

const Column = tw.li`block py-4 px-6 [& h3]:(font-semibold text-xs uppercase text-gray-500) [& span]:(text-lg text-white)`;

const Symbol = styled.span<{ index: number }>`
  ${({ index }) => textColors[index]}
`;

const EarningText = styled.span<{ isNegative: boolean }>`
  ${({ isNegative }) => (isNegative ? tw`text-red-500!` : tw`text-green-500!`)}
`;

const Loader = tw.div`absolute top-0 left-0 right-0 bottom-0 flex grow items-center justify-center`;

const Empty = tw.div`flex flex-col justify-center items-center [& p]:(text-white/80 p-4)`;
