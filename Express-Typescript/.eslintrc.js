module.exports={
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
         'plagin:prettier/recommended'
    ],
    parseOptions:{
        ecmaVersion:2018,
        sourceType:'module'
    },
    rules: {}
}