import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { callAPI } from "../utils/axioInstance";
import { createSearchParams, useNavigate } from "react-router-dom";
export const Search = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  const getSuggestions = () => {
    callAPI("/data/suggestions.json")
      .then((response) => {
        setSuggestions(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    navigate({
      pathname: "/search",
      search: `${createSearchParams({
        category: `${category}`,
        searchTerm: `${searchTerm}`,
      })}`,
    });

    setSearchTerm("");
    setCategory("All");
  };
  useEffect(() => {
    getSuggestions();
  }, []);
  return (
    <div className="w-[100%]">
      <div className="flex  items-center h-10 bg-amazonClone-yellow rounded">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-gray-300 text-black border text-xs xl:text-sm outline-none"
        >
          <option value="">All</option>
          <option value="">Deals</option>
          <option value="">Amazon</option>
          <option value="">Fashion</option>
          <option value="">Computers</option>
          <option value="">Home</option>
          <option value="">Mobile</option>
        </select>
        <input
          className="flex grow outline-none items-center h-[100%] rounded-l text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
        />
        <button onClick={onHandleSubmit} className="w-[45px]">
          <MagnifyingGlassIcon className="h-[27px] m-auto stroke-slate-900" />
        </button>
      </div>
      {suggestions && (
        <div className="bg-white text-black w-full z-40 absolute">
          {suggestions
            .filter((suggestion) => {
              const title = suggestion.title.toLowerCase();
              const currentSearchTerm = searchTerm.toLowerCase();
              return (
                currentSearchTerm &&
                title.startsWith(currentSearchTerm) &&
                title !== currentSearchTerm
              );
            })
            .slice(0, 10)
            .map((suggestion) => (
              <div
                onClick={() => setSearchTerm(suggestion.title)}
                key={suggestion.id}
              >
                {suggestion.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
