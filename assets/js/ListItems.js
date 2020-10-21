class ListItems extends Stimulus.Controller {
  static get targets() {
    // retudata-category-id
  }
  initialize() {
    // console.log("Loaded categories  Ctrl", data-category-idget);
  }
  destroyItem(e) {
    e.preventDefault();
    return Axios.delete(
      `http://localhost:3333/${this.path}/${this.itemID}`
    ).then((res) => location.reload());
  }
  get itemID() {
    return this.data.get("id");
  }
  get path() {
    return this.data.get("path");
  }
}
