export default ({app}, inject) => {
    inject('api', {
        definitions: '/definitions',
        companies: '/companies',
        info: '/info',
    });
};
