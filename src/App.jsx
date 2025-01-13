import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./redux/slice/counterSlice";
import Home from "./components/Home";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const counter = useSelector((state) => state.counter);
  const { value, countClick, history } = counter;
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(0);
  const [isSelectedTestRoute, setSelectedTestRoute] = useState(false);

  const handleCount = () => {
    dispatch(increment(inputValue));
  };

  if (isSelectedTestRoute) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Test route: {isSelectedTestRoute ? "On" : "Off"}</h1>
        <div
          className={`p-2 flex border w-[50px] rounded-md bg-gray-200 cursor-pointer`}
          onClick={() => setSelectedTestRoute(!isSelectedTestRoute)}
        >
          <div
            className={`w-5 h-5 rounded-full ${
              !isSelectedTestRoute
                ? "bg-gray-500"
                : "bg-green-500 transform translate-x-1/2"
            }`}
          ></div>
        </div>

        <Router>
          <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
              <li className="flex items-center gap-4">
                <Link to="/home" className="text-white hover:text-yellow-300">
                  Home view
                </Link>

                <Link to="/" onClick={() => setSelectedTestRoute(false)} className="text-white hover:text-yellow-300">
                  Comeback app
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Test route: {isSelectedTestRoute ? "On" : "Off"}</h1>
      <div
        className={`p-2 flex border w-[50px] rounded-md bg-gray-200 cursor-pointer`}
        onClick={() => setSelectedTestRoute(!isSelectedTestRoute)}
      >
        <div
          className={`w-5 h-5 rounded-full ${
            !isSelectedTestRoute
              ? "bg-gray-500"
              : "bg-green-500 transform translate-x-1/2"
          }`}
        ></div>
      </div>
      <h1>
        Total count: {value}, number clicked: {countClick}
      </h1>
      <form>
        <input
          className="p-1 border border-gray-300 rounded-md"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          type="button"
          className="p-1 text-white font-medium rounded-sm bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          onClick={handleCount}
        >
          count
        </button>
      </form>

      <div className="text-red-500 flex flex-col gap-2 w-[220px] min-w-max">
        Count history:{" "}
        <div className="flex flex-col gap-1 w-full flex-1">
          {Array.isArray(history) &&
            history.map((item, index) => (
              <span className="text-green-500" key={index}>
                - {item.pushedValue} with type: {item.type}{" "}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
