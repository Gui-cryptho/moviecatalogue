"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  onClear,
  className = "",
  showClearButton = true,
  disabled = false,
}) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)


    if (onSearch) {
      onSearch(value)
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    if (onClear) {
      onClear()
    }
    if (onSearch) {
      onSearch("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
     
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>


        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full pl-10 pr-12 py-3 
            border border-gray-600 rounded-lg 
            bg-gray-700 text-white 
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-500 disabled:cursor-not-allowed
            transition-colors duration-200
            sm:text-sm
          `}
        />

      
        {showClearButton && searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  )
}
