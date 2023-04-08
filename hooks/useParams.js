import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {isEmpty} from "lodash";
import {createSlug, parseQuery} from "../utils/helpers";

const useParams = () => {
    const router = useRouter();
    const [params, setParams] = useState({});

    /** is added to the url **/
    const addInToRoute = useCallback((queryParams) => {
        if (isEmpty(queryParams)) return;

        let paths = router.pathname;
        if (router.pathname.includes("/[...slug]")) {
            paths = router.pathname.replace("/[...slug]", "");
        }
        if (router.pathname.includes("[...slug]/")) {
            paths = router.pathname.replace("[...slug]/", "");
        }
        router.push(`${paths}/${createSlug(queryParams)}`, undefined, {shallow: true, scroll: false});
    }, [router]);

    /** set and delete params **/
    const setQueryParams = useCallback(({name, value}) => {
        const queryParams = {...params, [name]: value};

        if (!value) delete queryParams[name];
        setParams(queryParams);

        addInToRoute(queryParams);
    }, [params]);

    /** get query from url **/
    useEffect(() => {
        if (isEmpty(router.query)) return;
        const params = parseQuery(router.query?.slug);
        addInToRoute(params);
        setParams(params);
    }, []);

    return {
        setQueryParams,
        params,
    }
}

export default useParams;
