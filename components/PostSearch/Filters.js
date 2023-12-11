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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    const {
      searchTerm: searchTermInitial,
    } = queryString.parse(window.location.search);

    setSearchTerm(searchTermInitial || "");
  }, []);

  return (
    <div className="mx-auto my-5 flex gap-5 ">
      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={"Vui lòng nhập từ khóa"}
      />
      <div className={'flex-shrink-0'}>
        <div className="btn my-0" onClick={handleSearch}>
          Tìm kiếm
        </div>
      </div>
    </div>
  );
};
