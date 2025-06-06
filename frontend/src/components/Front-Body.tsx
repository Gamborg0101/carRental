export function FrontBody() {
  return (
    <div className="flex justify-center gap-10 p-10 items-center">
      <button className="flex-1 max-w-xs h-20 text-2xl bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition">
        Create Rental?
      </button>
      <button className="flex-1 max-w-xs h-20 text-2xl bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition">
        See all booking?
      </button>
    </div>
  );
}