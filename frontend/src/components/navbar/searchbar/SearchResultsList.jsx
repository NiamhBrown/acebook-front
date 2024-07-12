import "../../../../css/SearchResultList.css";
import { SearchResult } from "../searchbar/SearchResults";

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return (
                    <div key={id}>
                        <SearchResult FORENAME={result.forename} SURNAME={result.surname} userid = {result._id} />
                    </div>
                );
            })}
        </div>
    );
};