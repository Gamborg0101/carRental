import React from "react";

type ModalProps = {
  item: any;
  category: string;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export default function Modal({
  item,
  category,
  onClose,
  onDelete,
}: ModalProps) {
  const isCarOrUser = category === "cars" || category === "users";
  const hasUnreturnedRentals =
    isCarOrUser && item.rentals?.some((rental: any) => !rental.returnedAt);
  const deleteMessage =
    category === "cars"
      ? "The car is rented out and cannot be deleted."
      : "The user has an active rental and cannot be deleted.";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 capitalize">
          {category} Details
        </h2>

        <div className="space-y-2">
          {category === "users" && (
            <>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Name:</strong> {item.firstname} {item.lastname}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Phone:</strong> {item.phonenumber}
              </p>
            </>
          )}

          {category === "cars" && (
            <>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Model:</strong> {item.model}
              </p>
              <p>
                <strong>Maker:</strong> {item.maker}
              </p>
              <p>
                <strong>Year:</strong> {item.year}
              </p>
              <p>
                <strong>Rented:</strong>{" "}
                {item.rentals &&
                item.rentals.some((rented: any) => !rented.returnedAt)
                  ? "Yes"
                  : "No"}
              </p>
            </>
          )}

          {category === "rentals" && (
            <>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>User:</strong> {item.user?.firstname}{" "}
                {item.user?.lastname}
              </p>
              <p>
                <strong>Car:</strong> {item.car?.model}
              </p>
              <p>
                <strong>Rented at:</strong>{" "}
                {new Date(item.rentedAt).toLocaleString()}
              </p>
              <p>
                <strong>Returned:</strong>{" "}
                {item.returnedAt
                  ? new Date(item.returnedAt).toLocaleString()
                  : "Not returned"}
              </p>
            </>
          )}
        </div>

        {hasUnreturnedRentals ? (
          <p className="mt-4 text-red-600 font-semibold">{deleteMessage}</p>
        ) : (
          <button
            onClick={async () => {
              await onDelete(item.id);
              onClose();
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
