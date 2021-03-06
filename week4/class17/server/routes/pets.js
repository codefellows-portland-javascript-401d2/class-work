const router = require( 'express' ).Router();
const bodyParser = require( 'body-parser' ).json();
const Pet = require( '../models/pet' );

var byId = ( req ) => ({_id: req.params.id});

router
	.get( '/', ( req, res ) => {
		Pet.query( req.query ).select( 'name type' )
			.lean()
			.then( pets => res.json( pets ) );
	})
	.get( '/:id', ( req, res ) => {
		Pet.findById( req.params.id )
			.then( pets => res.json( pets ) );
	})
	.delete( '/:id', ( req, res ) => {
		Pet.findByIdAndRemove( req.params.id )
			.then( result => res.json( result ) );
	})
	.put( '/:id', bodyParser, ( req, res ) => {
		Pet.findOneAndUpdate( byId( req ), { $set: req.body }, { new: true } )
			.then( pet => res.json( pet ) );
	})
	.post( '/', bodyParser, ( req, res ) => {
		new Pet( req.body ).save()
			.then( pet => res.send( pet ) )
			.catch( error => {
				console.log( error );	
				res.json( { error } ); 
			});
	});
	
module.exports = router;