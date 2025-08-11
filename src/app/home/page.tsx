"use client";

import {useEffect} from "react";
import {listAllSynchronization} from "@/actions/synchronization";

function HomePage() {

    useEffect(() => {
        const fetchApi = async () => {
            const res = await listAllSynchronization();
            console.log(res);
        }

        fetchApi();
    }, []);

    return (
        <div>
            <p>Ola Mundo</p>
        </div>
    );
}

export default HomePage;