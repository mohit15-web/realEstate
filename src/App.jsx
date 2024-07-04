import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./components/Cards";
import FilterData from "./components/FilterData";
import { filterLiked, setSearch } from "./store/slices";

function App() {
  const [search, setSearchState] = useState("");
  const property = useSelector((state) => state.property.filteredProperty);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearch(search));
    setSearchState("");
  };

  const handleLiked = () => {
    dispatch(filterLiked());
  };

  return (
    <div>
      <nav className="flex justify-evenly flex-wrap items-center bg-gray-200 py-10">
        <h1
          className="text-5xl cursor-pointer"
          onClick={() => window.location.reload()}
        >
          🏠
        </h1>
        <h1 className=" text-2xl 2xl:text-4xl tracking-wider font-bold">
          Search properties to rent
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 my-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearchState(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            onClick={handleLiked}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Liked
          </button>
        </div>
      </nav>

      <FilterData />

      <div>
        <Cards data={property} />
      </div>
    </div>
  );
}

export default App;
