// Importações de bibliotecas e componentes
import React, { useState, useEffect, useCallback } from "react";
import { HeroSection, SearchBar, CategoryFilters, MovieGrid } from "../components"; 
import { theme } from "../utils/constants"; // Tema de cores
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 

// Componente principal da página inicial
export default function Home() {
  const navigate = useNavigate();

  // Estados principais
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("all"); 
  const [hoveredMovie, setHoveredMovie] = useState(null); 
  const [movies, setMovies] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Navegar para a página de favoritos
  const handleGoToFavourites = useCallback(() => navigate("/favourites"), [navigate]);

  // Navegar para a página de adicionar novo filme
  const handleGoToAddMovie = useCallback(() => navigate("/AddMovie"), [navigate]);

  // Função que busca os filmes da API, e verifica se são favoritos
  const fetchMoviesWithFavorites = useCallback(async (category = "all") => {
    try {
      let response;
      if (category === "all") {
        // Busca todos os filmes
        response = await axios.get("http://localhost:4000/view");
      } else {
        // Busca apenas filmes de uma categoria específica
        response = await axios.get(`http://localhost:4000/category/${category}`);
      }

      const filmes = response.data;

      // Verifica para cada filme se ele é favorito
      const filmesComFavorito = await Promise.all(
        filmes.map(async (filme) => {
          try {
            const favResp = await axios.get(`http://localhost:4000/favorito/${filme.id}`);
            return { ...filme, isFavorite: favResp.data.favorito };
          } catch (error) {
            console.error(`Erro ao buscar favorito do filme ${filme.id}:`, error);
            return { ...filme, isFavorite: false };
          }
        })
      );

      setMovies(filmesComFavorito); // Atualiza o estado com os filmes
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      alert("Erro ao buscar filmes. Verifique a API.");
    }
  }, []);

  // Carrega os filmes da categoria selecionada sempre que ela muda
  useEffect(() => {
    fetchMoviesWithFavorites(selectedCategory);
  }, [fetchMoviesWithFavorites, selectedCategory]);

  // Função chamada ao fazer uma busca por título
  const handleSearch = async (searchTerm) => {
    setIsSearching(true);
    setSearchQuery(searchTerm);

    try {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      const response = await axios.get("http://localhost:4000/search", {
        params: { titulo: searchTerm }
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      alert("Erro ao buscar filmes. Verifique a API.");
    } finally {
      setIsSearching(false);
    }
  };

  // Função para limpar a busca e recarregar os filmes da categoria
  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    fetchMoviesWithFavorites(selectedCategory);
  };

  // Altera a categoria selecionada e busca os filmes da nova categoria
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    fetchMoviesWithFavorites(category);
  }, [fetchMoviesWithFavorites]);

  // Quando um filme é clicado (aqui mostra apenas um alerta)
  const handleMovieClick = useCallback((movie) => {
    alert(`Selected: ${movie.title}`);
  }, []);

  // Alterna o status de favorito de um filme (favoritar/desfavoritar)
  const handleToggleFavorite = useCallback(async (selectedMovie) => {
    try {
      await axios.put(`http://localhost:4000/favoritar/${selectedMovie.id}`);
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === selectedMovie.id
            ? { ...movie, isFavorite: !movie.isFavorite }
            : movie
        )
      );
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar o filme:", error);
      alert("Erro ao alterar favorito. Tente novamente.");
    }
  }, []);

  // Deleta um filme da lista
  const handleDeleteMovie = useCallback(async (movieToDelete) => {
    try {
      const movieId = movieToDelete.id;
      if (!movieId) throw new Error("ID do filme não encontrado");

      await axios.delete(`http://localhost:4000/delete/${movieId}`);

      // Remove o filme deletado da lista atual e dos resultados da busca
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
      setSearchResults((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      if (error.response) {
        alert(`Erro do servidor: ${error.response.status}`);
      } else if (error.request) {
        alert("Erro de conexão. Verifique se a API está rodando.");
      } else {
        alert(`Erro: ${error.message}`);
      }
    }
  }, []);

  // Decide quais filmes mostrar: os resultados da busca ou os filmes carregados
  const filmesParaMostrar =
    searchQuery.trim() && searchResults.length > 0
      ? searchResults
      : movies;

  // Renderização da interface
  return (
    <div style={{ backgroundColor: theme.background, minHeight: "100vh" }} className="w-full">
      <div className="container mx-auto px-4 py-8">

        {/* Seção inicial com título e botões */}
        <HeroSection
          title="Catálogo de Filmes"
          subtitle="Descubre Novos Filmes"
          buttonText="Favoritos"
          onButtonClick={handleGoToFavourites}
          secondButtonText="Adicionar Filme"
          onSecondButtonClick={handleGoToAddMovie}
        />

        {/* Barra de busca */}
        <div className="mb-2 flex flex-col items-center">
          <SearchBar
            placeholder="Encontre seu Filme..."
            className="max-w-md w-full bg-gray-800 rounded"
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={isSearching}
          />
        </div>

        {/* Filtros por categoria */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Grade de filmes (resultados ou lista geral) */}
        <MovieGrid
          movies={filmesParaMostrar}
          hoveredMovie={hoveredMovie}
          onMovieHover={setHoveredMovie}
          onMovieClick={handleMovieClick}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteMovie}
        />
      </div>
    </div>
  );
}
