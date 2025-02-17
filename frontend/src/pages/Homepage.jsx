import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"
import Card from "../components/Card.jsx"
import { Link, NavLink } from "react-router-dom"
import Loader from "../components/Loader.jsx"
import axios from "axios";
import SearchHomePage from "../components/SearchHomePage.jsx";

export default function Homepage() {

    const [homeApartments, setHomeApartments] = useState([]);
    const { addLike, isLoading, setIsLoading, search, setSearch } = useGlobalContext();
    const apiURL = `http://localhost:3000/api`;
    const endpoint = `/apartments/`


    function getHomeApartments() {
        const searchValue = typeof search?.search === "string" ? search.search.trim() : "";

        axios.get(`${apiURL}${endpoint}homepage`, {
            params: searchValue ? { search: searchValue } : {}
        })
            .then((res) => {
                console.log(res.data);
                setHomeApartments(res.data.items);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=>{
                setIsLoading(false);
            });
    }



    useEffect(() => {
        const params = {};

        if (search.search) {
            params.search = search.search;
        }

        const queryParams = new URLSearchParams(params).toString();

        if (queryParams) {
            window.history.pushState({}, '', `?${queryParams}`);
        } else {
            window.history.pushState({}, '', '/advanced-research');
        }
        setIsLoading(true);

        getHomeApartments();
    }, [search])

    return (
        <div className="mb-3">
            <div className="container-fluid jumbotron p-5 mb-4 bg-light text-center">
                <div className="text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "20px", borderRadius: "5px" }}>
                    <h1 className="display-4 jumbo-text">Bool B&B</h1>
                    <p className="lead jumbo-text">
                        Find the perfect apartment for you with just one click.</p>
                </div>
                <Link className="btn custom-button mt-5 link-btn" to={"/advanced-research"} >Find out more </Link>
            </div>
            
            {isLoading && <Loader />}
            <SearchHomePage />
            <div className="row container m-auto">
                {homeApartments.length >= 1
                    ?
                    <>
                        <h3 className="py-2">Our most {homeApartments.length} loved apartments: </h3>

                        {homeApartments?.map((apartment) => (
                            <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                                <Card apartment={apartment} addLike={addLike} />
                            </div>
                        ))}
                    </>
                    : <h3 className="display-5">No results found for this research</h3>}
            </div>
        </div>
    )
}	