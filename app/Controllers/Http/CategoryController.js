"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */

// Model
const Category = use("App/Models/Category");

class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const categories = await Category.all().then((data) => data.toJSON());
    response.header("Turbolinks-Location", "/categories");
    return view.render("categories.categories", { categories });
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    response.header("Turbolinks-Location", "/categories");
    return view.render("categories.editor");
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { name, description, cat_slug } = request.post();
    const category = await Category.create({ name, description, cat_slug });
    return response.redirect("/categories/");
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { slug }, request, response, view }) {
    const category = await Category.findBy("slug", slug).then((data) =>
      data.toJSON()
    );
    response.header("Turbolinks-Local", "/categories/" + category.slug);
    return view.render("categories.category");
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params: { id }, request, response, view }) {
    const category = await Category.find(id).then((data) => data.toJSON());
    response.header("Turbolinks-Location", "/categories/edit/" + id);
    return view.render("categories.editor", { category });
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const category = await Category.find(id);
    const { name, description } = request.post();
    category.name = name || category.name;
    category.description = description;
    const saved = await category.save();
    return response.redirect("/categories");
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = CategoryController;
