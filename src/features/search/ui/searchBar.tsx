import "./searchBar.scss";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchProps) => {
  return (
    <div className="Search">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default SearchBar;
