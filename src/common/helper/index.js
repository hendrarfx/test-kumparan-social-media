export const numericFormatted = (amount) => {
    let components = amount.toLocaleString(undefined, {maximumFractionDigits: 2});
    return components;
}

export const utility = (state, newState) => {
    return {...state, ...newState};
};

export const filter = (data, key, value) => {

    let after = [];
    if (data !== undefined && key !== undefined && value !== undefined) {
        if (key !== '' && key !== null && value !== '' && value !== null) {
            if (data.length > 0) {
                after=data.filter(function (item) {
                    // eslint-disable-next-line
                    return item[key]==value;
                });
            } else {
                console.error('FILTER_UTILITY:length of data is 0')
            }
        } else {
            console.error('FILTER_UTILITY: key or value must not be null and empty')
        }
    } else {
        console.error('FILTER_UTILITY:data, key, or value is undefined')
    }
    return after;
}