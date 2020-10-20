class Categories extends Stimulus.Controller {
  static get targets() {
    // retudata-category-id
  }
  initialize() {
    // console.log("Loaded categories  Ctrl", data-category-idget);
  }
  deleteCategory(e) {
    e.preventDefault();
    const catId = e.currentTarget.getAttribute("data-category-id");
    return axios
      .delete("http://localhost:3333/categories/" + catId)
      .then((result) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
