'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});

Route.post('user/register', 'UserController.register');
Route.post('user/authenticated', 'UserController.authenticated');

Route.group(() => {
  Route.resource('genre', 'GenreController').apiOnly();
  Route.resource('movie', 'MovieController').apiOnly();
  Route.resource('users', 'UserController').apiOnly().except(['update', 'store', 'show', 'delete']);;
  Route.resource('watched', 'WatchedController').apiOnly().except(['store', 'show', 'delete']);
}).middleware('auth');
