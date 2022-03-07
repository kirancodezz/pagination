import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../util/Pagination";
import axios from "axios";
import "./styles/TableData.css";

let PageSize = 10;

const DeveloperList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("https://randomuser.me/api/?results=500").then((response) => {
            setUsers(response?.data)
            setLoading(false)
        });
    }, []);
    const currentDeveloperList = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return users?.results.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, users]);
    return (
        <>
            {loading ? <h3>Loading</h3> :
                <div>
                    <div className="userContainer">
                        <h1>Top Developers</h1>
                        <div className="usersWrapper">
                            <ul>
                                {currentDeveloperList.map((item, index) => {
                                    return(
                                        <li key={index}>
                                            <img src={item.picture.thumbnail} alt="thumbnail" />
                                            <p>{item.name.first}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={users?.results?.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            }
        </>
    );
}

export default DeveloperList;