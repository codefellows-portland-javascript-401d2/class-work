import template from './todo-item.html';
import styles from './todo-item.scss';

export default {
	template,
	controllerAs: 'todo',
	bindings: {
		task: '=',
		done: '=',
		update: '&',
		remove: '&'
	},
	controller: function(){
		this.styles = styles;

		this.change = () => {
			this.editing = false;
			this.update();
		};
	}
};