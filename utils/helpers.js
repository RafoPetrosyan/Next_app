export const createSlug = (params) => {
    return Object.keys(params).reduce((acc, key) => {
        acc += `${key}_${params[key]}/`;
        return acc;
    }, '');
}

export const parseQuery = (query) => {
    const data = query.filter(item => item.includes('_'));
    return data.reduce((acc, item) => {
        const element = item.split('_');
        acc[`${element[0]}`] = element[1];
        return acc;
    }, {});
}
