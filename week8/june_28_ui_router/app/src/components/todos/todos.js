import template from './todos.html';

export default {
	template,
	bindings: {
		listId: '<'
	},
	controller
};

controller.$inject = [ 'itemService' ];

function controller( itemService ) {
	
	itemService.get( this.listId )
		.then( items => this.todos = items )
		.catch( err => console.log( err ) );

	this.remove = ( id ) => {
		itemService.remove( this.listId, id )
			.then( () => {
				const index = this.todos.findIndex( item => item.id === id );
				if ( index !== -1 ) this.todos.splice( index, 1 );
			})
			.catch( err => console.error( err ) );
	};

	this.add = task => {
		const todo = { task, done: false };
		itemService.add( this.listId, todo )
			.then( item => {
				this.todos.push( item ); 
				this.error = '';
			})
			.catch( err => console.log( err ) );
	};
}