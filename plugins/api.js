export default ({app}, inject) => {
    inject('api', {
        definitions: '/definitions',
        companies: {
            list: '/companies',
            info: '/companies/info',
        },
    });
};
