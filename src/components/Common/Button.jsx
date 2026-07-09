import { Link } from "react-router-dom";

function Button({ text, to, color = "green" }) {
  const colors = {
    green: "bg-green-700 hover:bg-green-800",
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <Link
      to={to}
      className={`${colors[color]} text-white px-5 py-2 rounded-lg transition duration-300`}
    >
      {text}
    </Link>
  );
}

export default Button;