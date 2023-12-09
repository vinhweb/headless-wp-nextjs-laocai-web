import { useEffect, useState } from "react";
import queryString from "query-string";
import { Input } from "../Input";

export const Filters = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch({
      searchTerm,
    });
  };

  useEffect(() => {
    const {
      searchTerm: searchTermInitial,
    } = queryString.parse(window.location.search);

    setSearchTerm(searchTermInitial || "");
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <span>Min price</span>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <div className="btn" onClick={handleSearch}>
          Tìm kiếm
        </div>
      </div>
    </div>
  );
};
