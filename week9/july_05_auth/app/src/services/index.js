import angular from 'angular';
import camelcase from 'camelcase';
import path from 'path';

const reqContext = require.context(
	'./', //this directory
	true, //include subdirectories
	/^\.\/(?!index).+?\.js$/ //regex match any .js except this one
);

const services = angular.module( 'services', [] );

reqContext.keys().forEach( key => {
	let name = camelcase( path.basename( key, '.js' ) );
	if ( name === 'userService' ) name = 'UserService';
	services.factory( name, reqContext( key ).default );
});

export default services.name;