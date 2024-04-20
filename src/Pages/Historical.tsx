import tw, { TwStyle } from "twin.macro";
import Table from "../components/Table";
import { subDays, format } from "date-fns";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useAPI } from "../hooks";
import DatePicker from "react-datepicker";
import { TbDatabaseSearch } from "react-icons/tb";
import { CgSpinner } from "react-icons/cg";
import styled from "styled-components";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { MdCompareArrows } from "react-icons/md";
import { FaEquals } from "react-icons/fa";

type DateRangeProps = Array<{ name: string; value: "ytd" | "y" | "5d" | "6m" }>;
type formFieldProps = "from" | "to" | "range" | "ticker" | "benchmark";

const dateRangeTypes: DateRangeProps = [
  { name: "Year To Date", value: "ytd" },
  { name: "One Year", value: "y" },
  { name: "Five Days", value: "5d" },
  { name: "Six Months", value: "6m" },
];

const Historical = () => {
  const popperRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>();
  const [toDate, setToDate] = useState<Date | null>();
  const [reset, setReset] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState<formFieldProps>();
  const [selectedRange, setSelectedRange] =
    useState<DateRangeProps[number]["value"]>();
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const [selectedBenchmark, setSelectedBenchmark] = useState<string>();

  useClickAway(popperRef, () => setIsOpen(false));

  const tickerQuery = useAPI("https://api.iex.cloud/v1/search/aap", {
    enabled: true,
    queryKey: "symbols",
  });

  const query = useAPI(undefined, {
    searchParams:
      (selectedBenchmark && selectedTicker
        ? [selectedTicker, selectedBenchmark]
        : selectedTicker) || "",
    pathParams: {
      from_date: fromDate
        ? format(fromDate || new Date(), "yyyy-MM-dd")
        : undefined,
      to_date: toDate ? format(toDate || new Date(), "yyyy-MM-dd") : undefined,
      date_range: !toDate || !fromDate ? selectedRange : undefined,
    },
  });

  return (
    <Container>
      <Toolbar>
        <DateForm>
          <DatePickerList>
            <DatePickerButton
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
                setSelectedDateKey("ticker");
              }}
            >
              {selectedTicker ? (
                selectedTicker
              ) : (
                <span className="text-gray-700">Select Ticker</span>
              )}
            </DatePickerButton>
            {isOpen && tickerQuery.data && selectedDateKey === "ticker" ? (
              <RangePopper ref={popperRef}>
                <SearchInput type="search" placeholder="Search symbols..." />
                <ul>
                  {tickerQuery.data.map(({ symbol }: { symbol: string }) => (
                    <li
                      key={symbol}
                      onClick={() => {
                        setSelectedTicker(symbol);
                        setIsOpen(false);
                      }}
                    >
                      {symbol}
                    </li>
                  ))}
                </ul>
              </RangePopper>
            ) : null}
          </DatePickerList>

          <DatePickerList>
            <DatePickerButton
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
                setSelectedDateKey("benchmark");
              }}
            >
              {selectedBenchmark ? (
                selectedBenchmark
              ) : (
                <span className="text-gray-700">Select Ticker</span>
              )}
            </DatePickerButton>
            {isOpen && selectedDateKey === "benchmark" && tickerQuery.data ? (
              <RangePopper ref={popperRef}>
                <ul>
                  {tickerQuery.data.map(({ symbol }: { symbol: string }) => (
                    <li
                      key={symbol}
                      onClick={() => {
                        setSelectedBenchmark(symbol);
                        setIsOpen(!isOpen);
                      }}
                    >
                      {symbol}
                    </li>
                  ))}
                </ul>
              </RangePopper>
            ) : null}
          </DatePickerList>

          <DatePickerList>
            <DatePickerButton
              onClick={() => {
                setIsOpen(!isOpen);
                setSelectedDateKey("from");
              }}
            >
              {!reset && fromDate ? (
                format(fromDate, "yyyy-MM-dd")
              ) : (
                <span className="text-gray-700">From Date</span>
              )}
            </DatePickerButton>
            {isOpen && selectedDateKey === "from" ? (
              <DatePickerWrapper ref={popperRef}>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => {
                    setIsOpen(!isOpen);
                    setFromDate(date);
                    setSelectedDateKey(undefined);
                    setReset(false);
                    setSelectedRange(undefined);
                  }}
                  inline
                  maxDate={new Date()}
                  excludeDates={[new Date(), subDays(new Date(), 0)]}
                />
              </DatePickerWrapper>
            ) : null}
          </DatePickerList>

          <DatePickerList>
            <DatePickerButton
              onClick={() => {
                setIsOpen(!isOpen);
                setSelectedDateKey("to");
              }}
            >
              {!reset && toDate ? (
                format(toDate, "yyyy-MM-dd")
              ) : (
                <span className="text-gray-700">To Date</span>
              )}
            </DatePickerButton>

            {isOpen && selectedDateKey === "to" ? (
              <DatePickerWrapper ref={popperRef}>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => {
                    //  Check if toDate is set and is before fromDate
                    if (fromDate && date && date < fromDate) {
                      setToDate(null); // Reset toDate if it's before fromDate
                    } else setToDate(date);

                    setSelectedRange(undefined);
                    setIsOpen(!isOpen);
                    setSelectedDateKey(undefined);
                    setReset(false);
                  }}
                  inline
                  maxDate={new Date()}
                  isClearable={selectedDateKey === undefined}
                />
              </DatePickerWrapper>
            ) : null}
          </DatePickerList>

          <DatePickerList>
            <DatePickerButton
              onClick={() => {
                setIsOpen(!isOpen);
                setSelectedDateKey("range");
              }}
            >
              {selectedRange ? (
                dateRangeTypes.find(({ value }) => value === selectedRange)
                  ?.name
              ) : (
                <span className="text-gray-700">Select Date Range</span>
              )}
            </DatePickerButton>
            {isOpen && selectedDateKey === "range" ? (
              <RangePopper ref={popperRef}>
                <ul>
                  {dateRangeTypes.map(({ name, value }) => (
                    <li
                      key={value}
                      onClick={() => {
                        setSelectedRange(value);
                        setSelectedDateKey(undefined);
                        setIsOpen(!isOpen);
                        setFromDate(null);
                        setToDate(null);
                      }}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </RangePopper>
            ) : null}
          </DatePickerList>
        </DateForm>
        <Action>
          <ResetBtn
            onClick={(e) => {
              e.preventDefault();
              setSelectedRange(undefined);
              setSelectedDateKey(undefined);
              setSelectedTicker("");
              setSelectedBenchmark(undefined);
              setReset(true);
            }}
          >
            Reset
          </ResetBtn>

          <AlphaBtn
            disabled={query.isLoading || !selectedBenchmark}
            onClick={(e) => {
              e.preventDefault();
              query.refetch();
            }}
          >
            Get Alpha
          </AlphaBtn>

          <SubmitBtn
            disabled={
              query.isLoading ||
              !!selectedBenchmark ||
              !selectedTicker ||
              !fromDate
            }
            onClick={(e) => {
              e.preventDefault();
              query.refetch();
            }}
          >
            Submit
          </SubmitBtn>
        </Action>
      </Toolbar>

      <Caption>
        <h1>Historical Prices</h1>
        <p>Shows daily returns for the days specified</p>
      </Caption>

      <TableWrapper
        element="div"
        options={{ scrollbars: { autoHide: "scroll" } }}
        style={{
          overflow: "hidden",
          maxHeight: "600px",
        }}
      >
        <div className="sticky top-0 py-6 bg-black flex items-center justify-between">
          <div className="flex gap-x-6 items-center">
            {selectedTicker ? (
              <div>
                <Symbol index={Math.floor(Math.random() * textColors.length)}>
                  {selectedTicker}
                </Symbol>
                <h3 className="text-gray-500 uppercase text-xs py-px">
                  Symbol
                </h3>
              </div>
            ) : null}

            {selectedBenchmark ? (
              <>
                <MdCompareArrows className="text-gray-400 w-10 h-10" />
                <div>
                  <Symbol index={Math.floor(Math.random() * textColors.length)}>
                    {selectedBenchmark}
                  </Symbol>
                  <h3 className="text-gray-500 uppercase text-xs py-px">
                    Symbol
                  </h3>
                </div>
              </>
            ) : null}
            {query.data && query.data?.alpha && selectedBenchmark ? (
              <>
                <FaEquals className="text-gray-400 w-10 h-10" />
                <div>
                  <AlphaText
                    isNegative={query.data?.alpha.toString().includes("-")}
                  >
                    {query.data.alpha}
                  </AlphaText>
                  <h3 className="text-gray-500 uppercase text-xs py-px">
                    Alpha
                  </h3>
                </div>
              </>
            ) : null}
          </div>

          {/* Loader */}
          {query.data && !query.isLoading ? (
            <h3 className="text-green-500 uppercase text-xs py-px">
              {`${query.data.totalRecords || "No"} Records found`}
            </h3>
          ) : null}
        </div>

        {/* Table */}
        {!query.isLoading && query.data && !selectedBenchmark ? (
          <Table items={query.data?.items || []} />
        ) : query.isLoading ? (
          <Loader>
            <CgSpinner className="animate-spin h-20 w-20 mr-3 text-gray-700" />
          </Loader>
        ) : (
          <Empty>
            <TbDatabaseSearch className="h-20 w-20 mr-3 text-gray-700" />
            <p>No Data Found</p>
          </Empty>
        )}
      </TableWrapper>
    </Container>
  );
};

export default Historical;

const textColors: Array<TwStyle> = [
  tw`text-green-500!`,
  tw`text-purple-500!`,
  tw`text-blue-500!`,
  tw`text-orange-500!`,
  tw`text-violet-500!`,
  tw`text-pink-500!`,
  tw`text-yellow-500!`,
  tw`text-cyan-500!`,
];

const Container = tw.div`flex flex-col w-full`;

const TableWrapper = tw(
  OverlayScrollbarsComponent
)`flex flex-col relative bg-black pb-5 px-5 rounded-3xl h-fit!`;

const Caption = tw.div`px-2 py-6 [& h1]:(text-3xl font-bold text-gray-200) [& p]:(text-gray-500 font-light py-1)`;

const Toolbar = tw.div`flex w-fit self-center gap-x-10 items-center bg-gray-900 rounded-lg py-5 px-10 shadow-xl`;

const DateForm = tw.div`flex items-center justify-center gap-x-6 border-r border-black py-2 pr-10 `;

const Action = tw.div`flex gap-x-8`;

const SubmitBtn = tw.button`h-fit font-light rounded-3xl bg-indigo-700 hover:(ring-indigo-700) ring-8 ring-indigo-950 text-white py-2 px-10 transition-all disabled:(cursor-not-allowed opacity-50)`;

const ResetBtn = tw.button`h-fit font-light rounded-3xl bg-gray-950 hover:(ring-gray-950) ring-8 ring-gray-950/30 text-white py-2 px-6 transition-all`;

const AlphaBtn = tw.button`h-fit font-light rounded-3xl bg-cyan-700 hover:(ring-cyan-700) ring-8 ring-cyan-900/30 text-white py-2 px-6 transition-all disabled:(cursor-not-allowed opacity-50)`;

const DatePickerList = tw.div`flex flex-col relative `;

const DatePickerWrapper = tw.div`z-50 absolute! top-full! left-0!`;

const DatePickerButton = tw.button`w-fit! rounded-lg hover:bg-black bg-slate-950 text-gray-300 p-2 px-6`;

const RangePopper = tw(
  DatePickerWrapper
)`flex flex-col items-center py-3 bg-slate-950 shadow-2xl rounded-lg mt-1 w-fit [& li]:(py-3 px-4 text-gray-500 cursor-pointer hover:(text-white bg-gray-900)) transition-all`;

const Empty = tw.div`flex flex-col justify-center items-center [& p]:(text-white/80 p-4)`;

const Loader = tw.div`absolute top-0 left-0 right-0 bottom-0 flex grow items-center justify-center`;

const Symbol = styled.span<{ index: number }>`
  ${({ index }) => [textColors[index], tw`text-2xl`]}
`;

const SearchInput = tw.input`text-slate-300 font-light bg-black  py-2 px-4  placeholder:text-slate-600 outline-none focus:(ring-inset ring-gray-900)`;

const AlphaText = styled.span<{ isNegative: boolean }>`
  ${({ isNegative }) => (isNegative ? tw`text-red-500!` : tw`text-green-500!`)}
`;
