"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");
Route.on("/page").render("welcome");

// categories
Route.get("categories", "CategoryController.index");
Route.get("categories/add", "CategoryController.create");
Route.get("categories/:slug", "CategoryController.show");
Route.get("categories/edit/:id", "CategoryController.edit");

Route.post("categories", "CategoryController.store");
Route.put("categories/:id", "CategoryController.update");
Route.delete("categories/:id", "CategoryController.destroy");
