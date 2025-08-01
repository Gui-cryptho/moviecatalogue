
import MovieCard from "./MovieCard"

export default function MovieGrid({ movies, hoveredMovie, onMovieHover, onMovieClick, onToggleFavorite, onDelete }) {
    if (!movies || movies.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-400">No movies found</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie, index) => (
                <MovieCard
                    key={movie.id || index}
                    movie={movie}
                    isHovered={hoveredMovie === movie.id}
                    onMouseEnter={() => onMovieHover(movie.id)}
                    onMouseLeave={() => onMovieHover(null)}
                    onClick={() => onMovieClick(movie)}
                    onToggleFavorite={onToggleFavorite}
                    onRemove={onDelete}
                    isFavorite={movie.isFavorite}
                />
            ))}
        </div>
    )
}