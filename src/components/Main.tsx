import tw from "twin.macro";

const Main = () => {
  return (
    <Container>
      <Header>
        <SearchInput type="search" placeholder="Search ticker symbols ..." />
      </Header>

      <ContentWrapper>
        <Toolbar>
          <FilterButton>Submit</FilterButton>
        </Toolbar>
      </ContentWrapper>
    </Container>
  );
};

export default Main;

const Container = tw.main`flex flex-col items-center w-full`;

const Header = tw.header`flex flex-col w-full items-center py-10 border-b border-black`;

const SearchInput = tw.input`text-slate-300 font-light text-2xl bg-black rounded-full p-5 w-2/3 placeholder:text-slate-800 outline-none focus:(ring ring-8 ring-gray-900)`;

const ContentWrapper = tw.div`flex flex-row items-center justify-center bg-red-500 w-11/12`;

const Toolbar = tw.div`flex self-center w-2/5 bg-orange-500`;

const FilterButton = tw.button`text-xl uppercase font-semibold rounded-full bg-violet-700 text-white py-4 px-10`;
