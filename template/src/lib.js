import {{ name }} from './components/hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#sass}}
import './styles/lib.scss'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/sass}}
{{#stylus}}
import './styles/lib.styl'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/stylus}}

export default {{ name }}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
