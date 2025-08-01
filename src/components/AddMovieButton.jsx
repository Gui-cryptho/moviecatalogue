import { Plus } from "lucide-react";

export default function AddMovieButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-black px-12 py-3 min-w-[180px] rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
    >
      <Plus className="w-5 h-5 text-black" />
      Add Movie
    </button>
  );
}
