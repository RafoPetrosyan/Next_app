import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {isEmpty} from "lodash";
import {createSlug, parseQuery} from "../utils/helpers";

const useParams = () => {
    const router = useRouter();
    const [params, setParams] = useState({});

    /** set and delete params **/
    const setQueryParams = useCallback(({name, value}) => {
        const newParams = {...params, [name]: value};
        if(!value) delete newParams[name];
        setParams(newParams);
    }, [params]);

    /** is added to the url **/
    useEffect(() => {
        if(isEmpty(params)) return;
        const paths = router.pathname.replace("[...slug]/", "");
        console.log(paths)
        router.push(`${paths}/${createSlug(params)}`, undefined, { shallow: true, scroll: false });
    }, [params]);

    useEffect(() => {
        // if(isEmpty(router.query)) return;
        // parseQuery(router.query);
    }, []);

    return {
        setQueryParams,
    }
}

export default useParams;
