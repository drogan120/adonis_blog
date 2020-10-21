"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostSchema extends Schema {
  up() {
    this.create("posts", (table) => {
      table.increments();
      table.timestamps();
      table.string("title").notNullable();
      table.string("post_slug").notNullable();
      table.string("slug").notNullable();
      table.string("seo_title");
      table.string("seo_description");
      table.string("seo_keyword");
      table.string("body");
      table.string("summary");
      table.string("markdown");
      table.integer("category_id").unsigned().nullable();
      table
        .foreign("category_id")
        .references("categories.id")
        .onDelete("SET NULL");
      table.boolean("published").defaultTo(false);
      table.integer("user_id").unsigned().nullable();
      table.foreign("user_id").references("users_id").onDelete("SET NULL");
    });
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostSchema;
