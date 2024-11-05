export default function SearchBox() {
  return (
    <div className="flex items-center mb-8">
      <span className="absolute ml-4 text-gray-600">
        <i className="fas fa-search text-xl"></i>
      </span>
      <input
        type="text"
        placeholder="Search"
        className="flex-1 pl-12 p-2 py-4 outline-none border rounded-lg"
      />
    </div>
  );
}
