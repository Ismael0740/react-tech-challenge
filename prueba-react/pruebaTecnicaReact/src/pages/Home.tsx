import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { navBarHeight } from "../components/Navbar";
import { NavBar } from "../components/Navbar";

// Title Component
const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  height: ${navBarHeight};
  display: flex;
  align-items: center;
`;

// Card Component
const StyledCard = styled(Link)`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 200px;
  height: 300px;
  background-image: url(${(props: { imageUrl: string }) => props.imageUrl});
  background-size: cover;
  background-position: center;
  text-decoration: none;
`;

type CardProps = {
  title: string;
  imageUrl: string;
  to: string;
};

function Card({ title, imageUrl, to }: CardProps) {
  return (
    <StyledCard imageUrl={imageUrl} to={to}>
      <h3>{title}</h3>
    </StyledCard>
  );
}

// Footer Component
function Footer() {
  return (
    <footer>
      <p>&copy; 2024 My App</p>
    </footer>
  );
}

// Home Component
function Home() {
  return (
    <div>
      <NavBar title="Demo streaming" />
      <Title>Popular Titles</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "3rem",
          overflowX: "auto",
          padding: "1rem",
        }}
      >
        <Card
          title="SERIES"
          imageUrl="https://via.placeholder.com/150"
          to="/series"
        />
        <Card
          title="MOVIES"
          imageUrl="https://via.placeholder.com/150"
          to="/movies"
        />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
