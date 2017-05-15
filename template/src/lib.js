import {{ name }} from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {{ name }}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
