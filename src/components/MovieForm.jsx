export default function MovieForm({ formData, onInputChange, onSubmit }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 rounded-2xl p-6"
      style={{ color: 'white' }}
    >
      <div>
        <label className="block text-sm font-medium text-white mb-1">Título *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Enter movie title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Diretor *</label>
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Enter director name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Ano *</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Enter release year"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Genêro</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
        >
          <option value="">Selecione o gênero</option>
          <option value="Ação">Ação</option>
          <option value="Comédia">Comédia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Romance">Romance</option>
          <option value="Ficção Científica">Ficção Científica</option>
          <option value="Guerra">Guerra</option>
          <option value="Suspense">Suspense</option>
          <option value="Biografia">Biografia</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Duração (min)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Enter duration"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Avaliação</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Enter rating (0-5)"
          min="0"
          max="5"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-white mb-1">descrição</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Enter description"
          rows={3}
          maxLength={200}
        />
        <p className="text-sm text-gray-400 text-right">{formData.description.length}/200</p>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-white mb-1">Imagem URL</label>
        <input
          type="url"
          name="poster"
          value={formData.poster}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Enter poster image URL"
        />
      </div>
      <div className="col-span-2 flex justify-end mt-4">
        <button
          type="submit"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
        >
          Salvar Filme
        </button>
      </div>
    </form>
  );
}
