import {useEffect, useState} from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        /**
         * ---- Method fetchData ----
         * @returns {Promise<void>}
         */

        const fetchData = async () => {
            setLoading(true);

            try{
                const response = await fetch(url);
                const json = await response.json();

                setData(json);
                setLoading(false);

            }catch (error){
                setError(error);
                setLoading(false);
            }
        }

        /**
         * ---- Load Method ----
         */

        fetchData();
    },[url]);

    return { loading, error, data }
}

export default useFetch;