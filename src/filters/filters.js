import Vue from "vue";

function capitalize(value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function initializeGlobalFilters() {
    Vue.filter('capitalize', capitalize);
}
