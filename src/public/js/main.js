const deleteForm = document.querySelectorAll("form#delete-form");
const dialog = document.body.querySelector("dialog.delete-dialog");
const cancel = document.body.querySelector("button.cancel");
const dialogDelete = dialog.querySelector(".dialog.delete");
deleteForm.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    dialog.showModal();
    dialogDelete.addEventListener("click", (e) => {
      form.submit();
    });
  });
});
cancel.addEventListener("click", (e) => {
  dialog.close();
});
