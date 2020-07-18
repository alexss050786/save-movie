'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Movie = use('App/Models/Movie')
/**
 * Resourceful controller for interacting with movies
 */
class MovieController {
  /**
   * Show a list of all movies.
   * GET movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const movies = await Movie
      .query()
      .where('user_id', auth.user.id)
      .where('watched_flag', false)
      .with('user')
      .with('genre')
      .fetch();
    return movies;
  }

  /**
   * Create/save a new movie.
   * POST movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(['title', 'sinopse', 'genre_id']);
    const movie = await Movie.create({
      user_id: auth.user.id,
      watched_flag: false,
      ...data
    });

    return movie;
  }

  /**
   * Display a single movie.
   * GET movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const movie = await Movie.findOrFail(params.id);
    const response = await Movie.query()
      .where("id", movie.id)
      .with("user")
      .with("genre")
      .fetch();
    return response;
  }

  /**
   * Update movie details.
   * PUT or PATCH movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(["title", "sinopse", "genre_id"]);
    const movie = await Movie.findOrFail(params.id);
    movie.merge(data);
    await movie.save();

    return movie;
  }

  /**
   * Delete a movie with id.
   * DELETE movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const movie = await Movie.findOrFail(params.id);
    await movie.delete();
  }
}

module.exports = MovieController
