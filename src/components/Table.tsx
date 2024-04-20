import styled from "styled-components";
import tw from "twin.macro";

type DailyReturn = {
  open: number;
  close: number;
  priceDate: string;
  symbol: string;
  earnings: number;
};

const Table = ({ items }: { items: Array<DailyReturn> }) => {
  return (
    <Container>
      {items?.length
        ? items.map(({ open, close, priceDate, earnings }, i) => (
            <Row key={i}>
              <Column>
                <h3>Open</h3>
                <span>{open}</span>
              </Column>
              <Column>
                <h3>Close</h3>
                <span>{close}</span>
              </Column>
              <Column>
                <h3>Price Date</h3>
                <span>{priceDate}</span>
              </Column>
              <Column>
                <h3>Earnings</h3>
                <EarningText isNegative={earnings.toString().includes("-")}>
                  {earnings}
                </EarningText>
              </Column>
            </Row>
          ))
        : null}
    </Container>
  );
};

export default Table;

const Container = tw.div``;

const Row = tw.ul`grid grid-cols-4 bg-gray-900 justify-between first-of-type:rounded-t-lg last-of-type:rounded-b-lg  overflow-hidden hover:(bg-gray-900/90) not-last-of-type:(border-b border-black )`;

const Column = tw.li`block py-4 px-6 [& h3]:(font-semibold text-xs uppercase text-gray-500) [& span]:(text-lg text-white)`;

const EarningText = styled.span<{ isNegative: boolean }>`
  ${({ isNegative }) => (isNegative ? tw`text-red-500!` : tw`text-green-500!`)}
`;
