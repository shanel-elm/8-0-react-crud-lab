
import { Link } from "react-router-dom";
import { getAllShows } from "../../api/fetch";
import { useEffect, useState } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import ShowListing from "./ShowListing";
import "./ShowsIndex.css";

export default function ShowsIndex() {
  const [loadingError, setLoadingError] = useState(false);
  const [shows, setShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

//Make a function that will grab out input value
function handleTextChange(event) {
  const title = event.target.value;
  setSearchTitle(title);
//Add our filtered function as a ternary
  const result = title.length ? filterShows(title, allShows) : allShows;
  setShows(result);
}

//console.log(searchTitle);

function filterShows(search, shows) {
  return shows.filter((show) => {
    return show.title.toLowerCase().match(search.toLowerCase());
  });
}


  useEffect(() => {
    getAllShows()
      .then((response) => {
        setShows(response);
        setAllShows(response);
        setLoadingError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, []);

 // console.log(shows);

  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Shows</h2>
          <button>
            <Link to="/shows/new">Add a new show</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Shows:
            <input
              type="text"
                value={searchTitle}
              id="searchTitle"
                onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {/* <!-- ShowListing components --> */}
            {shows.map((show) => {
              return <ShowListing show={show} key={show.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
