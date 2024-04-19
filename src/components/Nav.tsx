import { BiSolidUserCircle } from "react-icons/bi";
import tw from "twin.macro";

const Nav = () => {
  return (
    <Container>
      <LogoWrapper>
        <Logo>Sail-X</Logo>
      </LogoWrapper>

      <Profile>
        <BiSolidUserCircle className="flex self-center w-24 h-24" />
        <ul>
          <li>Profile</li>
          <li>Portfolio</li>
        </ul>
      </Profile>

      <MenuWrapper>
        <NavList>
          <NavMenuItems href="#">Historical Prices</NavMenuItems>
        </NavList>
        <NavList>
          <NavMenuItems href="#">Alpha</NavMenuItems>
        </NavList>
      </MenuWrapper>
    </Container>
  );
};

export default Nav;

const Container = tw.nav`flex flex-col bg-black w-fit h-full`;

const MenuWrapper = tw.ul`mt-5`;

const NavList = tw.li`px-5 hover:(cursor-pointer bg-sailx [& > a]:(text-orange-400)) transition-all`;

const NavMenuItems = tw.a`flex grow whitespace-nowrap  text-xl font-thin py-3 px-5 text-slate-400 uppercase transition-all`;

const LogoWrapper = tw.div`flex items-center justify-center p-5 mt-5`;

const Logo = tw.h1`text-orange-500 uppercase font-bold text-2xl bg-sailx border-x-4 border-orange-700 py-4 px-10 rounded-full`;

const Profile = tw.div`flex flex-col self-center mt-6  bg-sailx w-full py-6 [& ul]:(w-full py-2 text-center) [& li]:(w-full font-thin py-4 hover:(text-orange-500 cursor-pointer) text-gray-400 px-3 not-last-of-type:(border-b border-black))`;
