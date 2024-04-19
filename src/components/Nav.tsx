import tw from "twin.macro";

const Nav = () => {
  return (
    <Container>
      <LogoWrapper>
        <Logo>Sail-X</Logo>
      </LogoWrapper>

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

const Container = tw.nav`bg-black w-80 h-full`;

const MenuWrapper = tw.ul`mt-10`;

const NavList = tw.li`hover:(cursor-pointer [& > a]:(bg-sailx text-violet-400)) transition-all`;

const NavMenuItems = tw.a`block text-xl font-thin py-3 px-5 text-slate-400 uppercase transition-all`;

const LogoWrapper = tw.div`flex items-center justify-center p-5`;

const Logo = tw.h1`text-violet-500 uppercase font-bold text-2xl bg-sailx py-4 px-10 rounded-full`;
