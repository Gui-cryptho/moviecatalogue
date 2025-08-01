
import { theme } from "../utils/constants"

export default function CategoryFilters({ selectedCategory, onCategoryChange }) {
    const categories = ["ação", "drama", "comedia", "aventura", "Ficção Científica", "terror", "guerra", "suspense","biografia"]
    const allCategories = ["all", ...categories]

    return (
        <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
                {allCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                            selectedCategory === category
                                ? "text-white shadow-lg"
                                : "text-gray-300 hover:text-white"
                        }`}
                        style={{
                            backgroundColor: selectedCategory === category 
                                ? theme.primary 
                                : theme.cardBackground,
                            borderColor: theme.primary
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    )
}
