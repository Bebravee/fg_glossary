import { useEffect, useState } from "react";
import type Term from "@/types/termType";
import { getTerms } from "@/lib/api";
import { log } from "console";
import "./terms.scss";

interface TermsProps {
  searchInput: string;
}

const Terms = ({ searchInput }: TermsProps) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTerms = async () => {
      try {
        setLoading(true);
        const response = await getTerms();
        console.log(response);
        setTerms(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadTerms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Terms">
      {terms.map((term) => (
        <div className="Terms-content" key={term.id}>
          <h1 className="Terms-content-title">{term.title}</h1>
          <p className="Terms-content-description">{term.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Terms;
