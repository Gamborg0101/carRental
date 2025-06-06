import carImage from "../assets/car.png";
import { Link } from "react-router-dom";

export default function FrontBody() {
  return (
    <div>
      <img src={carImage} alt="Car" className="w-full h-80 object-fill;" />
      <div className="flex justify-center items-center gap-10 p-10 flex-wrap">
        <Link
          to="rental"
          className="flex-1 max-w-xs h-20 text-2xl bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          Create Rental?
        </Link>
        <button className="flex-1 max-w-xs h-20 text-2xl bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition">
          See all booking?
        </button>
      </div>
    </div>
  );
}
