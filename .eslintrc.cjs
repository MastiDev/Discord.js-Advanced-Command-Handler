// eslint-disable-next-line no-undef
module.exports = {
	'env': {
		'node': true,
		'es6': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
		{
			'files': ['src/**/*'],
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};