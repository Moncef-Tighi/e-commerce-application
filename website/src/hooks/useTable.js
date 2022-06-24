import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const useTable = function(query) {


    const [searchParams, setSearchParams] = useSearchParams({});

    useEffect( ()=> {
        setUrl(() => readURL(searchParams))
    }, [searchParams] )
    
    useEffect( ()=> {
        const key = query?.key;
        let param={}
        param[key] = query?.value
        if (query?.value) setSearchParams(param)
    }, [query, setSearchParams])

    const readURL = function(searchParams) {
        let output="";
        for (const [key, value] of searchParams.entries()) {
            output+=`&${key}=${value}`
        }
        return output;
    }
    
    const readURLObject = function(searchParams) {
        let output={};
        for (const [key, value] of searchParams.entries()) {
            output[key]=value
        }
        return output;
    }

    const [url, setUrl] = useState(readURL(searchParams));

    const handleChangePage = async (event, newPage) => {
        let param=readURLObject(searchParams);
        param["page"] = newPage;
        setSearchParams(param);
    };

    const sortHandeler = function(event, key) {
        let param=readURLObject(searchParams);
        let order = "-"
        if (param["sort"]===`-${key}`) order ="+"
        param["sort"] = `${order}${key}`;
        setSearchParams(param);
    }

    return {url, handleChangePage, sortHandeler}
}

export default useTable;