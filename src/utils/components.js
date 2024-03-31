export default {
    install: function (Vue) {
        const files = require.context('@/views', true, /\.vue$/);
        let components = {};
        files.keys().forEach(key => {
            components[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default;
        });
        Object.keys(components).forEach(item => {
            if (components[item].name) {
                Vue.component(components[item].name, components[item]);
            }
        });
    },
}