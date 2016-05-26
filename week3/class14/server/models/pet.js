const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const petSchema = new Schema({
	_id: false,
	name: { 
		type: String, 
		required: true 
	},
	type: { 
		type: String, 
		default: 'bird' 
	}
});

const petModel = mongoose.model( 'Pet', petSchema );

module.exports = petModel;