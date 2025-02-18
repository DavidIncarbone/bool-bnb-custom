import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";



export default function FilteredSearch() {

    const { searchFormData, setSearchFormData } = useGlobalContext();

    //setSearchFormData(initialSearchFormData);

    const [tempFormData, setTempFormData] = useState({
        search: "",
        category: "",
        minRooms: "",
        minBeds: ""
    });



    useEffect(() => {
        console.log("updated searchFormData: ", searchFormData);
    }, [searchFormData]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTempFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setSearchFormData(tempFormData);
    }

    return (
        <section style={{ marginTop: "50px" }}>
            <form onSubmit={handleOnSubmit} className="container m-auto p-4 shadow-lg rounded bg-light">
                <h2 className="text-center mb-4">Search for an accomodation</h2>
                <div className="form-group pb-3">
                    <label htmlFor="search">Search here city or address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        name="search"
                        placeholder="Enter city or address"
                        value={tempFormData.search}
                        onChange={handleOnChange} />
                </div>
                <div className="row pb-3">
                    <div className="form-group col-12 col-lg-4">
                        <label htmlFor="category">Select a category</label>
                        <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={tempFormData.category}
                            onChange={handleOnChange}
                        >
                            <option value={"0"}>Select apartment category</option>
                            <option value={"1"}>Chalet</option>
                            <option value={"2"}>Apartment</option>
                            <option value={"3"}>Villa</option>
                            <option value={"4"}>Loft</option>
                            <option value={"5"}>Studio</option>
                            <option value={"6"}>Penthouse</option>
                        </select>
                    </div>
                    <div className="form-group col-6 col-lg-4">
                        <label htmlFor="minRooms">Choose min. number of rooms</label>
                        <input
                            type="number"
                            className="form-control"
                            id="minRooms"
                            name="minRooms"
                            placeholder="Enter min. number of rooms"
                            min="0"
                            value={tempFormData.minRooms}
                            onChange={handleOnChange} />
                    </div>
                    <div className="form-group col-6 col-lg-4">
                        <label htmlFor="minBeds">Choose min. number of beds</label>
                        <input
                            type="number"
                            className="form-control"
                            id="minBeds"
                            name="minBeds"
                            placeholder="Enter min. number of rooms"
                            min="0"
                            value={tempFormData.minBeds}
                            onChange={handleOnChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-send">Search</button>
            </form>
        </section>
    );
}