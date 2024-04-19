import { useRef, useState } from "react";
import tw from "twin.macro";
import DatePicker from "react-datepicker";
import { format, subDays } from "date-fns";
import { useClickAway } from "react-use";
import Historical from "../Pages/Historical";
import { useAPI } from "../hooks";

type DateRangeProps = Array<{ name: string; value: "ytd" | "y" | "5d" | "6m" }>;

const dateRangeTypes: DateRangeProps = [
  { name: "Year To Date", value: "ytd" },
  { name: "One Year", value: "y" },
  { name: "Five Days", value: "5d" },
  { name: "Six Months", value: "6m" },
];

const Main = () => {
  const popperRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(subDays(new Date(), 1));
  const [toDate, setToDate] = useState<Date | null>(new Date());
  const [reset, setReset] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState<
    "from" | "to" | "range"
  >();
  const [selectedRange, setSelectedRange] =
    useState<DateRangeProps[number]["value"]>();
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [queryKey, setQueryKey] = useState("");

  useClickAway(popperRef, () => {
    setIsOpen(false);
  });

  const query = useAPI(queryKey, {
    searchParams: "spi",
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
      <Header>
        <SearchInput type="search" placeholder="Search ticker symbols ..." />
      </Header>

      <ContentWrapper>
        <Toolbar>
          <DateForm>
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
              onClick={() => {
                setSelectedRange(undefined);
                setSelectedDateKey(undefined);
                setReset(true);
              }}
            >
              Reset
            </ResetBtn>
            <SubmitBtn
              onClick={() => {
                setIsSubmitClicked(true);
                setQueryKey("historical");
                query.refetch();
              }}
            >
              Submit
            </SubmitBtn>
          </Action>
        </Toolbar>

        <Historical />
      </ContentWrapper>
    </Container>
  );
};

export default Main;

const Container = tw.main`flex flex-col items-center w-full`;

const Header = tw.header`flex flex-col w-full items-center py-10  border-black`;

const SearchInput = tw.input`text-slate-300 font-light text-2xl bg-black rounded-full p-5 w-2/3 placeholder:text-slate-600 outline-none focus:(ring ring-8 ring-gray-900)`;

const ContentWrapper = tw.div`flex flex-col justify-center w-11/12`;

const Toolbar = tw.div`flex w-fit self-center gap-x-10 items-center bg-gray-900 rounded-lg py-5 px-10 shadow-xl`;

const DateForm = tw.div`flex items-center justify-center gap-x-10 border-r border-black py-2 pr-10 `;

const Action = tw.div`flex gap-x-8`;

const SubmitBtn = tw.button`h-fit font-light rounded-3xl bg-indigo-700 hover:(ring-indigo-700) ring-8 ring-indigo-950 text-white py-2 px-10 transition-all`;

const ResetBtn = tw.button`h-fit font-light rounded-3xl bg-gray-950 hover:(ring-gray-950) ring-8 ring-gray-950/30 text-white py-2 px-6 transition-all`;

const DatePickerList = tw.div`flex flex-col relative `;

const DatePickerWrapper = tw.div`z-50 absolute! top-full! left-0!`;

const DatePickerButton = tw.button`w-fit rounded-lg hover:bg-black bg-slate-950 text-gray-300 p-2 px-10`;

const RangePopper = tw(
  DatePickerWrapper
)`py-3 bg-slate-950 shadow-2xl rounded-lg mt-1 w-full [& li]:(py-3 px-4 text-gray-500 cursor-pointer hover:(text-white bg-gray-900)) transition-all`;
