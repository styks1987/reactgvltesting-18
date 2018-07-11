/** @format */

export default phone => {
    const regex = RegExp(/^(\d{3})(\d{1,3})?(\d{1,4})?$/);

    const matches = regex.test(phone);

    return !matches;
};
