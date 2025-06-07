type SearchControlsProps = {
  category: string;
  setCategory: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export default function SearchControls({
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
}: SearchControlsProps) {
  return (
    <div className="flex gap-4 mb-4">
      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="users">Users</option>
        <option value="cars">Cars</option>
        <option value="rentals">Rentals</option>
      </select>

      <input
        type="text"
        className="border p-2 rounded flex-1"
        placeholder={`Search ${category}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
