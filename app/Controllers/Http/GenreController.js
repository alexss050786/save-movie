'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Genre = use('App/Models/Genre');

/**
 * Resourceful controller for interacting with genres
 */
class GenreController {
  /**
   * Show a list of all genres.
   * GET genres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const genres = await Genre.all();
    return genres;
  }

  /**
   * Create/save a new genre.
   * POST genres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all();
    const genre = await Genre.create(data);

    return response.status(200).send(genre);
  }

  /**
   * Display a single genre.
   * GET genres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const genre = await Genre.findOrFail(params.id);
    return genre;
  }

  /**
   * Update genre details.
   * PUT or PATCH genres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(["description"]);
    const genre = await Genre.findOrFail(params.id);

    genre.merge(data);
    await genre.save();

    return genre;
  }

  /**
   * Delete a genre with id.
   * DELETE genres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const genre = await Genre.findOrFail(params.id);
    await genre.delete();
  }
}

module.exports = GenreController
