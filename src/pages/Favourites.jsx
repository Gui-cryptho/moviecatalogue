// Importa hooks do React
import { useState, useEffect, useCallback } from "react";

import { HeroSection, SearchBar, MovieGrid, MovieEmptyState } from "../components";

import { useNavigate } from "react-router-dom";

import { theme } from "../utils/constants";

import axios from "axios";

// Componente principal que exibe a tela de favoritos
function Favourites() {
  const navigate = useNavigate(); 
  const [favoriteMovies, setFavoriteMovies] = useState([]); 
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSearching, setIsSearching] = useState(false);

  // Busca os filmes favoritos ao montar o componente
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Requisição para buscar favoritos da API
        const response = await axios.get("http://localhost:4000/favoritos");
        setFavoriteMovies(response.data);
        setFilteredMovies(response.data); 
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
        setError("Erro ao carregar os filmes favoritos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Função de busca de filmes pelo título
  const handleSearch = useCallback(async (titulo) => {
    setSearchQuery(titulo); 
    if (titulo.trim() === "") {
      
      setFilteredMovies(favoriteMovies);
      return;
    }

    setIsSearching(true);

    try {
      // Faz uma busca na API geral de filmes com o título
      const response = await axios.get("http://localhost:4000/search", {
        params: { titulo }
      });

      const filmesBuscados = response.data; 

      // Filtra apenas os filmes buscados que também estão nos favoritos
      const favoritosFiltrados = favoriteMovies.filter(fav =>
        filmesBuscados.some(filme => filme.id === fav.id)
      );

      setFilteredMovies(favoritosFiltrados); 
    } catch (error) {
      console.error("Erro ao buscar filmes na busca:", error);
      setError("Erro ao buscar filmes.");
    } finally {
      setIsSearching(false); 
    }
  }, [favoriteMovies]);

  // Limpa a busca e restaura os favoritos completos
  const handleClear = useCallback(() => {
    setSearchQuery("");
    setFilteredMovies(favoriteMovies);
  }, [favoriteMovies]);

  // JSX da interface
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-4 py-8">

        {/* Cabeçalho da página */}
        <HeroSection 
          title="Favoritos"
          subtitle="Vale a Pena ver Denovo"
          buttonText="Home"
          onButtonClick={() => navigate("/")} 
        />

        {/* Barra de pesquisa */}
        <div className="mb-4 max-w-md mx-auto">
          <SearchBar 
            placeholder="Pesquisar favoritos..."
            onSearch={handleSearch}
            onClear={handleClear}   
            isLoading={isSearching} 
            value={searchQuery}     
          />
        </div>

        {/* Exibição dos filmes */}
        <div className="mt-8">
          {loading && <p className="text-white">Carregando favoritos...</p>} // Mostra enquanto carrega
          {error && <p className="text-red-500">{error}</p>} // Mostra mensagem de erro
          
          {/* Caso não haja favoritos após o carregamento */}
          {!loading && !error && filteredMovies.length === 0 && <MovieEmptyState />}
          
          {/* Mostra a grade de filmes filtrados */}
          {!loading && !error && filteredMovies.length > 0 && (
            <MovieGrid 
              movies={filteredMovies} 
              hoveredMovie={null}
              onMovieHover={() => {}} 
              onMovieClick={(movie) => alert(`Selected: ${movie.title}`)} 
              onToggleFavorite={() => {}} 
            />
          )}
        </div>
      </div>
    </div>
  );
}


export default Favourites;
