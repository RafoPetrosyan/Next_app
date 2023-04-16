import {isEmpty} from "lodash";
import Router from "next/router";

class QueryParams {
    static createSlug = (params) => {
        return Object.keys(params).reduce((acc, key) => {
            acc += `${key}_${params[key]}/`;
            return acc;
        }, '');
    }

    static parseQuery = (query) => {
        if (typeof window === 'undefined') return;
        if (isEmpty(query)) return {};
        return query.reduce((acc, item, index) => {
            if (item.includes('_')) {
                const element = item.split('_');
                acc[`${element[0]}`] = element[1];
            } else {
                Router.push('/error')
            }
            return acc;
        }, {});
    }

    static addInToRoute = async (queryParams) => {
        let paths = Router.pathname;
        if (Router.pathname.includes("/[...slug]")) {
            paths = Router.pathname.replace("/[...slug]", "");
        }
        if (Router.pathname.includes("[...slug]/")) {
            paths = Router.pathname.replace("[...slug]/", "");
        }
        if (isEmpty(queryParams)) {
            await Router.push(paths, undefined, {shallow: true, scroll: false});
            return;
        }
        await Router.push(`${paths}/${this.createSlug(queryParams)}`, undefined, {shallow: true, scroll: false});
    }

    static delete = () => this.addInToRoute({});

    static get = () => {
        if (typeof window === 'undefined') return;
        if (isEmpty(Router.query)) return {};
        return this.parseQuery(Router.query?.slug);
    }

    static set = ({name, value}) => {
        const queryParams = {...this.get(), [name]: value};

        if (!value) delete queryParams[name];

        this.addInToRoute(queryParams);
    }
}

export default QueryParams;




