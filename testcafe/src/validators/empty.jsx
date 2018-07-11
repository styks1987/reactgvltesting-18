/** @format */

export default value => {
    if (typeof value == 'undefined') {
        return true;
    }

    if (value === null) {
        return true;
    }

    if (value === '') {
        return true;
    }

    return false;
};
