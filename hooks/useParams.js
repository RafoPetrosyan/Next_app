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
        if (!value) delete newParams[name];
        setParams(newParams);
    }, [params]);

    /** is added to the url **/
    useEffect(() => {
        if (isEmpty(params)) return;
        let paths = router.pathname;
        if (router.pathname.includes("/[...slug]")) {
            paths = router.pathname.replace("/[...slug]", "");
        }
        if (router.pathname.includes("[...slug]/")) {
            paths = router.pathname.replace("[...slug]/", "");
        }
        router.push(`${paths}/${createSlug(params)}`, undefined, {shallow: true, scroll: false});
    }, [params]);

    /** get query from url **/
    useEffect(() => {
        if (isEmpty(router.query)) return;
        setParams(parseQuery(router.query.slug));
    }, []);

    return {
        setQueryParams,
        params,
    }
}

export default useParams;
