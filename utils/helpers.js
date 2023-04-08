import {isEmpty} from "lodash";

export const createSlug = (params) => {
    return Object.keys(params).reduce((acc, key) => {
        acc += `${key}_${params[key]}/`;
        return acc;
    }, '');
}

export const parseQuery = (query) => {
    if(isEmpty(query)) return {};
    return query.reduce((acc, item) => {
        if(item.includes('_')) {
            const element = item.split('_');
            acc[`${element[0]}`] = element[1];
        }
        return acc;
    }, {});
}
