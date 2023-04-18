import {useRouter} from "next/router";
import {useMemo} from "react";
import QueryParams from "../utils/queryParams";

const useParams = () => {
    const router = useRouter();

    return useMemo(() => QueryParams.get(), [router.query]);
}

export default useParams;
