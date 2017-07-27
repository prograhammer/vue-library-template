import {{ name }} from './components/hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {{ name }}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
