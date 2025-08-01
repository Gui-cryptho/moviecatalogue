import React from "react"
import { theme } from "../utils/constants"
import PopcornIcon from "./icons/PopcornIcon"

function HeroSection({ 
  title = "Bem Vindo ao Cine Catálogo ", 
  subtitle = "Descubra os melhore filmes", 
  buttonText = "Explore Now", 
  onButtonClick, 
  secondButtonText, 
  onSecondButtonClick 
}) {
  const handleExploreClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      alert('Explore clicked!');
    }
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl mb-12 h-96" 
      style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
        <PopcornIcon />
      </div>
      
      <div className="relative z-10 flex items-center h-full px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-white/90 mb-6">
            {subtitle}
          </p>
          <div className="flex space-x-4">
            <button 
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
              onClick={handleExploreClick}
            >
              {buttonText}
            </button>
            {secondButtonText && (
              <button 
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
                onClick={onSecondButtonClick}
              >
                {secondButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(HeroSection)
