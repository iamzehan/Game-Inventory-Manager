const dialog = document.querySelector(".confirm-dialog");
const actionBtn = dialog.querySelector(".dialog.action");
const cancelBtn = dialog.querySelector(".dialog.cancel")
const dialogMessage = dialog.querySelector(".dialog.text");
const dialogItem = dialog.querySelector(".dialog.item");

// form items
const form = document.querySelector(".submit-form");
const item = document.querySelector("input#title, input#name");

// add class to the confirm button
actionBtn.classList.add("primary");

// add the name of the item you are changing
item.addEventListener("keyup", (e)=> {
    dialogItem.textContent = e.target.value;
})

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    // is the form adding or updating
    const type = form.getAttribute("data-name");
    const message = "Do you want to "+type
    // add the message to the dialog
    dialogMessage.textContent = message;
    // The item should match the color of the action - e.g. update is yellow
    dialogItem.style.color = type==="update"?"var(--color-yellow-2)"
    : "var(--color-blue-3)";
    // if you are updating add the update button style
    if(type==="update") {
        actionBtn.classList.add("update");
        dialogItem.textContent = item.value;
    }
    dialog.showModal();
})

// when you press continue the button will submit the form
actionBtn.addEventListener("click", ()=> form.submit());
// press cancel and the dialog will close
cancelBtn.addEventListener("click", ()=> dialog.close());