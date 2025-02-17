import styled from "styled-components";

type NavBarProps = {
  title: string;
};

export const navBarHeight = "4rem";

const StyledNavBar = styled.nav`
  background-color: blue;
  color: white;
  padding: 1rem 4rem;
  height: ${navBarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin: 0;
  }

  div {
    display: flex;
    gap: 1rem;
  }
`;

const LoginButton = styled.button`
  background-color: darkblue;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TrialButton = styled.button`
  background-color: darkblue;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export function NavBar({ title }: NavBarProps) {
  return (
    <StyledNavBar>
      <h1>{title}</h1>
      <div>
        <LoginButton>Log In</LoginButton>
        <TrialButton>Start your free trial</TrialButton>
      </div>
    </StyledNavBar>
  );
}
