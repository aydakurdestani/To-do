const listItems = document.querySelector(".todo-tasks");
const newItem = document.querySelector(".input-header input");
const filterItems = document.querySelector(".filter-buttons");

let temp;
newItem.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (temp) {
      e.preventDefault();
      temp.innerHTML = newItem.value;
      temp = "";
      newItem.value = "";
      return;
    }
    
    var listElements = document.createElement("li");
    var textBox = document.createElement("div");
    var checkBox = document.createElement("input");
    var actionBox = document.createElement("span");
    textBox.appendChild(document.createTextNode(newItem.value));
    actionBox.appendChild(document.createTextNode("..."));
    actionBox.style.cursor = "pointer";
    var newElement = document.createElement("ul");
    var DeleteTag = document.createElement("li");
    DeleteTag.className = "menu";
    const DeleteText = document.createTextNode("Delete");
    DeleteTag.appendChild(DeleteText);
    newElement.appendChild(DeleteTag);
    var EditTag = document.createElement("li");
    EditTag.className = "menu";
    const EditText = document.createTextNode("Edit");
    EditTag.appendChild(EditText);
    newElement.appendChild(EditTag);
    newElement.className = "actions lists";

    filterItems.addEventListener("click", (e) => {
      const todos = document.querySelectorAll(".todo-tasks");
      todos.forEach(() => {
        switch (e.target.innerHTML) {
          case "All":
            listElements.style.display = "flex";
            break;

          case "Completed":
            if (textBox.style.textDecoration !== "line-through") {
              listElements.style.display = "none";
            } else {
              listElements.style.display = "flex";
            }
            break;
          case "Pending":
            if (textBox.style.textDecoration === "line-through") {
              listElements.style.display = "none";
            } else {
              listElements.style.display = "flex";
            }
            break;
        }
      });
    });

    checkBox.addEventListener("change", (e) => {
      if (e.target.checked) {
        textBox.style.textDecoration = "line-through";
      } else {
        textBox.style.textDecoration = "none";
      }
    });

    actionBox.addEventListener("click", function () {
      newElement.style.display = "block";
    });

    newElement.addEventListener("click", function () {
      newElement.style.display = "none";
    });

    DeleteTag.addEventListener("click", () => {
      listItems.removeChild(listElements);
    });

    EditTag.addEventListener("click", () => {
      temp = textBox;
      newItem.value = temp.innerHTML;
    });

    checkBox.setAttribute("type", "checkbox");
    listElements.className = "todo-task";

    listElements.appendChild(newElement);
    listElements.appendChild(checkBox);
    listElements.appendChild(textBox);
    listElements.appendChild(actionBox);

    listItems.appendChild(listElements);
    newItem.value = "";

    var actions = document.querySelector(".actions");
    actions.style.display = "none";
  }
});

function deleteAll() {
  var e = document.querySelector(".todo-tasks");
  e.innerHTML = "";
}
var btn = (document.getElementById("btn").onclick = function () {
  deleteAll();
});

//createFunction
function createDomElement(tagName, attributes = {}, ...items) {
  let element = document.createElement(tagName);

  for ([attributeKey, attributeValue] of Object.entries(attributes)) {
    if (attributeKey === "listeners") {
      for ([eventName, handler] of Object.entries(attributeValue)) {
        element.addEventListener(eventName, handler);
      }
    } else if (attributeValue) {
      element.setAttribute(attributeKey, attributeValue);
    }
  }

  if (items.length > 0) {
    let docFrag = document.createDocumentFragment();
    for (childEl of items) {
      if (typeof childEl === "string") {
        let div = document.createElement("div");
        div.innerHTML = childEl;
        while (div.childNodes.length > 0) {
          docFrag.appendChild(div.childNodes[0]);
        }
      } else if (childEl) {
        docFrag.appendChild(childEl);
      }
    }

    element.appendChild(docFrag);
  }

  return element;
}
let myelement = createDomElement("div", {
  class: "tab-item",
});
console.log(myelement);
