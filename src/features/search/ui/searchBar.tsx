import style from "./SearchBar.module.scss";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchProps) => {
  return (
    <div className={style.SearchBar}>
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
