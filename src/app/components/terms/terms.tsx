import "./terms.scss";

interface TermsProps {
  searchInput: string;
}

const Terms = ({ searchInput }: TermsProps) => {
  return (
    <div className="Terms">
      <div className="Terms-content">
        <h1 className="Terms-content-title">tile</h1>
        <p className="Terms-content-description">description</p>
      </div>
    </div>
  );
};

export default Terms;
