# Tabri

Tabri

## Instalation

```bash
npm install @ibrahimalanshor/tabri
```

## Usage

```js
const tabri = require('@ibrahimalanshor/tabri')

const server = tabri({
	port: 4000, // Default 4000
	logging: true, // Default true
	debug: true, // Default true
	static: { // Default not used
		path: '/public', // url path for static
		dir: __dirname + '/public' // directory for static
	},
	i18n: { // Default not used
		messages: require('./messages') // list of messages
		defaultLocale: 'en' // default locale
	},
	routes: [require('./routes')], // array of router
})
```
