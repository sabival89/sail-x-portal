import { Dispatch, SetStateAction } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import styled from "styled-components";
import tw from "twin.macro";

const Nav = ({
  route,
  setRoute,
}: {
  route?: string;
  setRoute: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <Container>
      <LogoWrapper>
        <Logo>Sail-X</Logo>
      </LogoWrapper>

      <Profile>
        <BiSolidUserCircle className="flex self-center w-24 h-24 text-gray-800" />
        <span className="flex self-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500 text-xl py-2 ">
          Valentine Aduaka
        </span>
        <ul>
          <li>Profile</li>
          <li>Portfolio</li>
        </ul>
      </Profile>

      <MenuWrapper>
        <NavList
          active={!!route?.includes("historical_prices")}
          onClick={() => setRoute("historical_prices")}
        >
          <NavMenuItems href="#historical_prices">
            Historical Prices
          </NavMenuItems>
        </NavList>
      </MenuWrapper>
    </Container>
  );
};

export default Nav;

const Container = tw.nav`flex flex-col bg-black w-fit h-full`;

const MenuWrapper = tw.ul`mt-5`;

const NavList = styled.li<{
  active: boolean;
}>`
  ${({ active }) => active && tw`bg-sailx [& > a]:text-orange-500!`}
  ${() =>
    tw`w-full hover:(cursor-pointer bg-sailx [& > a]:(text-orange-400)) transition-all`}
`;

const NavMenuItems = tw.a`flex grow whitespace-nowrap text-lg font-thin py-3 px-5 text-slate-400 uppercase transition-all`;

const LogoWrapper = tw.div`flex items-center justify-center p-5 mt-5`;

const Logo = tw.h1`text-white uppercase font-bold text-2xl bg-sailx border-x-4 border-gray-700 py-2 px-10 rounded-full`;

const Profile = tw.div`flex flex-col self-center mt-6  w-full py-6 [& ul]:(w-full py-2 text-center) [& li]:(w-full font-thin py-4 hover:(text-orange-500 cursor-pointer) text-gray-400 px-3 not-last-of-type:(border-b border-black))`;
