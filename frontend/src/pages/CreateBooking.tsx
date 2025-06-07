import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateUserForm from "../components/forms/CreateUserForm";
import CreateCarForm from "../components/forms/CreateCarForm";
import CreateRentalForm from "../components/forms/CreateRentalForm";

type FormType = "user" | "car" | "rental" | null;

export default function CreateBooking() {
  const [activeForm, setActiveForm] = useState<FormType>(null);

  function closeModal() {
    setActiveForm(null);
  }

  return (
    <>
      <div className="app-container">
        <Header />
        <div className="flex flex-row items-center justify-center gap-4 px-6 py-6">
          <button
            onClick={() => setActiveForm("user")}
            className="flex-1 max-w-xs h-20 text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Create User
          </button>
          <button
            onClick={() => setActiveForm("car")}
            className="flex-1 max-w-xs h-20 text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Create Car
          </button>
          <button
            onClick={() => setActiveForm("rental")}
            className="flex-1 max-w-xs h-20 text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Create Rental
          </button>
        </div>
        <Footer />
      </div>

      {activeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold leading-none right-1 top-0"
              aria-label="Close modal"
            >
              &times;
            </button>

            {activeForm === "user" && <CreateUserForm />}
            {activeForm === "car" && <CreateCarForm />}
            {activeForm === "rental" && <CreateRentalForm />}
          </div>
        </div>
      )}
    </>
  );
}
