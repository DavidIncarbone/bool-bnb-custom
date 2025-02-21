import axios from "axios"
import FilteredSearch from "../components/FilteredSearch";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import LoaderCard from "../components/LoaderCard";
import { motion } from "framer-motion";
import Pagination from "../components/Pagination"
import { useSearchContext } from "../contexts/SearchContext";


export default function AdevancedResearch() {

    const { addLike, isLoading, setIsLoading, isHomePage, resetForm
    } = useGlobalContext();
    const {
        handleOnChange, handleOnSubmit, searchFormData, tempFormData, setTempFormData
        isPaginationFlag, filteredApi, apartmentsCount, page, numPages, handleFilteredPageChange
    } = useSearchContext();
    const delayAnim = 0.05;
    function handleReset() {
        setTempFormData(
            {
                search: "",
                category: "",
                minRooms: "",
                minBeds: ""
            }
        )
    }

    return (
        <>
            <FilteredSearch submit={handleOnSubmit} onChange={handleOnChange} tempFormData={tempFormData} resetForm={() => { resetForm(tempFormData) }} handleReset={handleReset} />
            <div className="container m-auto row mb-3">
                <h3 className="pt-5">Results for your research: {apartmentsCount} {searchFormData?.search ?
                    <>for <strong>{searchFormData.search}</strong></>
                    : ""}
                </h3>

                {filteredApi.length >= 1 ?
                    filteredApi?.map((apartment, index) => (
                        <div className="col-12 col-md-6 col-lg-3 g-4" key={apartment.id} >
                            {
                                isLoading ? <LoaderCard />
                                    :
                                    (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: index * delayAnim }} // Ritardo progressivo
                                        >
                                            <Card apartment={apartment} addLike={addLike} />
                                        </motion.div>
                                    )
                            }
                        </div>
                    ))
                    :
                    <div className="text-center py-5 no-query">
                        <h3 className="display-5">No results found for this research</h3>
                    </div>}
                {!isPaginationFlag &&
                    <div>
                        <Pagination filteredPage={page} handleFilteredPageChange={handleFilteredPageChange} numFilteredPages={numPages} />
                    </div>}
            </div>
        </>
    )
}