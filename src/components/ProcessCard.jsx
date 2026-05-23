export default function ProcessCard({ processo, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white
        text-left
        rounded-2xl
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
        p-8
        border
        border-gray-200
      "
    >
      <div className="text-blue-800 mb-5">
        {processo.icon}
      </div>

      <h2 className="text-xl font-bold text-gray-800">
        {processo.codigo}
      </h2>

      <p className="text-gray-500 mt-2">
        {processo.titulo}
      </p>
    </button>
  );
}