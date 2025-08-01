
import { Film } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/constants";
import { useState } from 'react';

// Componentes reutilizáveis
import { HeroSection, MovieForm, AddMovieButton } from "../components";

// Biblioteca para requisições HTTP
import axios from "axios";

// Componente principal da página de adicionar filme
export default function AddMovie() {
  const navigate = useNavigate(); 

  // Estado que controla a exibição do formulário
  const [showForm, setShowForm] = useState(false);

  // Estado para controle de carregamento e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado com os dados do formulário
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    duration: '',
    rating: '',
    description: '',
    poster: ''
  });

  // Atualiza os campos do formulário conforme o usuário digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Lógica para envio do formulário
  const handleSubmit = async () => {
  
    if (!formData.title || !formData.director || !formData.year) {
      alert('Porfavor coloque título, Diretor e Ano');
      return;
    }

    if (formData.description.length > 500) {
      alert('A descrição não pode ter mais de 200 caracteres.');
      return;
    }

    setLoading(true);    
    setError(null);      

    // Prepara os dados no formato esperado pela API
    const newMovieData = {
      Titulo: formData.title,
      diretor: formData.director,
      ano: Number(formData.year),
      avaliacao: formData.rating ? Number(formData.rating) : null,
      categoria: formData.genre,
      descricao: formData.description,
      imagem: formData.poster
    };

    try {
      // Envia os dados para a API
      await axios.post("http://localhost:4000/newMovie", newMovieData, {
        headers: { 'Content-Type': 'application/json' }
      });

      setFormData({
        title: '',
        director: '',
        year: '',
        genre: '',
        duration: '',
        rating: '',
        description: '',
        poster: ''
      });

      setShowForm(false);

    } catch (err) {
      console.error("Erro ao salvar o filme:", err);
      setError("Erro ao salvar o filme. Tente novamente.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-4 py-8">

        {/* Cabeçalho da seção com botão de voltar à Home */}
        <HeroSection 
          title="Adicionar Filmes"
          buttonText="Home"
          onButtonClick={() => navigate("/")}
        />

        {/* Container do conteúdo */}
        <div className="max-w-6xl mx-auto p-6" style={{ backgroundColor: theme.background, borderRadius: '1rem', minHeight: '100vh' }}>
          <div className="bg-gray rounded-2xl shadow-lg p-6 mb-6">

            {/* Título da página e botão para exibir/ocultar formulário */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Film className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-white">Adicionar Filmes</h1>
              </div>

              {/* Botão que alterna a exibição do formulário */}
              <AddMovieButton onClick={() => setShowForm(!showForm)} />
            </div>

            {/* Formulário de cadastro de filme */}
            {showForm && (
              <div className="bg-gray-800 rounded-2xl p-6 mb-6 border-2 border-white">
                <h2 className="text-xl font-semibold text-white mb-4">Adicionar Novo Filme</h2>

                {/* Exibe erro, se houver */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Componente de formulário */}
                <MovieForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                  disabled={loading}
                />

                {/* Exibe mensagem de carregamento ao salvar */}
                {loading && <p className="text-white mt-2">Salvando filme...</p>}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
