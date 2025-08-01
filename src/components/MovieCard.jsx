import React from "react";
import { theme } from "../utils/constants";

export default function MovieCard({ 
  movie, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave, 
  onClick,
  onRemove,
  onToggleFavorite,
  isFavorite = false,
  showRemove = true,
  showFavorite = true
}) {
  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove?.(movie);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(movie);
  };

  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div 
        className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
        style={{ backgroundColor: theme.cardBackground }}
      >
        {/* Action buttons */}
        <div className={`absolute top-2 right-2 z-10 flex gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {showFavorite && (
            <button
              onClick={handleToggleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                isFavorite 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          )}
          
          {showRemove && (
            <button
              onClick={handleRemove}
              className="w-8 h-8 bg-white/80 hover:bg-red-500 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="Remove movie"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {movie.imagem && (
          <div className="aspect-[2/3] overflow-hidden relative">
            <img
              src={movie.imagem}
              alt={movie.Titulo}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-white text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Play Now</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 
              className="font-semibold text-lg line-clamp-2 flex-1"
              style={{ color: theme.textPrimary }}
            >
              {movie.Titulo}
            </h3>
            {isFavorite && (
              <div className="ml-2 flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            )}
          </div>

          {movie.ano && (
            <p 
              className="text-sm mb-2"
              style={{ color: theme.textSecondary }}
            >
              {movie.ano}
            </p>
          )}

          {movie.diretor && (
            <p
              className="text-sm mb-2 italic"
              style={{ color: theme.textSecondary }}
            >
              Diretor: {movie.diretor}
            </p>
          )}

          {movie.avaliacao && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(movie.avaliacao) 
                        ? "text-yellow-400" 
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span 
                className="ml-2 text-sm"
                style={{ color: theme.textSecondary }}
              >
                {movie.avaliacao}/5
              </span>
            </div>
          )}

          {movie.descricao && (
            <p 
              className="text-sm line-clamp-3"
              style={{ color: theme.textSecondary }}
            >
              {movie.descricao}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
