import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { NavBar } from "../components/Navbar";
import { navBarHeight } from "../components/Navbar";

// Types
type Movie = {
  title: string;
  description: string;
  programType: string;
  releaseYear: number;
  images: {
    "Poster Art": {
      url: string;
    };
  };
};

// Styled Components
const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  height: ${navBarHeight};
  display: flex;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const Card = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
    border: 2px solid white;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
`;

const CardTitle = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  margin: 0;
  text-align: center;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const LoadingError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.5rem;
`;

function Movies() {
  const [datos, setDatos] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("data/sample.json")
      .then((res) => {
        if (!res.ok) throw new Error("Oops, algo salió mal...");
        //TODO: add runtime checking
        return res.json() as Promise<{ entries: Movie[] }>;
      })
      .then((data) => {
        const filtered = data.entries
          .filter(
            (item) =>
              item.programType === "movie" && item.releaseYear >= 2010
          )
          .sort((a, b) => a.title.localeCompare(b.title))
          .slice(0, 20);

        setDatos(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <NavBar title="Demo Streaming" />
        <LoadingError>Loading...</LoadingError>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar title="Demo Streaming" />
        <LoadingError>
          Oops, algo salió mal...
        </LoadingError>
      </div>
    );
  }

  return (
    <div>
      <NavBar title="Demo Streaming" />
      <Title>Películas Populares</Title>
      <Grid>
        {datos.map((movie, idx) => (
          <Card key={idx} onClick={() => setSelectedMovie(movie)}>
            <CardImage
              src={movie.images["Poster Art"].url}
              alt={movie.title}
            />
            <CardTitle>{movie.title}</CardTitle>
          </Card>
        ))}
      </Grid>

      {selectedMovie && (
        <Modal onClick={() => setSelectedMovie(null)}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedMovie(null)}>×</CloseButton>
            <h2>{selectedMovie.title}</h2>
            <img
              src={selectedMovie.images["Poster Art"].url}
              alt={selectedMovie.title}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
            <p><strong>Año:</strong> {selectedMovie.releaseYear}</p>
            <p><strong>Descripción:</strong> {selectedMovie.description}</p>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default Movies;
