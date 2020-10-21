const app = Stimulus.Application.start();

app.register("list-items", ListItems);
document.addEventListener("turbolinks:load", (evt) => {
  feather.replace();
});
