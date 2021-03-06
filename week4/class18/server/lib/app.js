const express = require( 'express' );
const app = express();

const auth = require( '../routes/auth' );
const pets = require( '../routes/pets' );
const users = require( '../routes/users' );

const ensureAuth = require( './ensureAuth' );
const ensureRole = require( './ensureRole' );

const path = require( 'path' );
const public = path.join( __dirname, '../public' );

const Grant = require( 'grant-express' );
const grantConfig = require( '../grant' );
const grant = new Grant( grantConfig );
const session = require( 'express-session' );

app.use( '/connect', session({ 
	secret: process.env.APP_SECRET, 
	resave: true, 
	saveUninitialized: true,
	// TODO only allow when NODE_ENV !== production
	cookie: { secure: false }
}));

app.use( grant );

app.use( express.static( public ) );

app.use( '/auth', auth );
app.use( '/pets', ensureAuth, pets );
app.use( '/users', ensureAuth, ensureRole( 'admin' ), users );

app.use( ( err, req, res, next ) => {
	console.error( err );
	res
		.status( err.code || 500 )
		.json({ error: err.error || 'Server error' });
});

module.exports = app;