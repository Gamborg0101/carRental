type HeaderProps = {
  onCreateRental?: () => void;
  onLookupBookings?: () => void;
};

export default function Header({
  onCreateRental,
  onLookupBookings,
}: HeaderProps) {
  return (
    <header className="grid grid-cols-3 items-center h-16 bg-blue-500 px-6">
      <div id="logo-container" className="text-white font-bold text-xl">
        LOGO
      </div>
      <div></div>
      <div
        id="button-container"
        className="flex justify-end space-x-4 md:shrink-0"
      >
        <button
          onClick={onCreateRental}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition min-w-[120px] truncate"
        >
          <p>Create rental</p>
        </button>
        <button
          onClick={onLookupBookings}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition min-w-[120px] truncate"
        >
          <p>See exisiting bookings</p>
        </button>
      </div>
    </header>
  );
}
