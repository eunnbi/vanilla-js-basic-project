const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const input = form.querySelector("input");
const submitBtn = form.querySelector(".submit-btn");
const list = document.querySelector(".grocery-items");
const clearBtn = document.querySelector(".clear-btn");

let editFlag = false;
let editElement = null;
let editID = "";

const ITEMS_KEY = "items";
let items = [];

clearBtn.addEventListener("click", function(){
    list.innerHTML = "";
    items = [];
    saveItems();
    displayAlert("empty list", "warning");
});


function saveItems(){
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}


function displayAlert(text, className){
    alert.innerText = text;
    alert.classList.add(className);
    setTimeout(function(){
        alert.innerText = "";
        alert.classList.remove(className);
    }, 1000);
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    const value = input.value;
    if (value == ""){
        displayAlert("please enter value", "warning");
    }
    else{
        addListItem(value);
    }
    setBackToDefalut();
})

function addListItem(value){
    if (!editFlag){
        const id = Date.now();
        createItem(id, value, false);
        displayAlert("item added to the list", "success");

        // update items array and localStorage
        const newItem = {
            item: value,
            id: id,
            checked: false,
        };
        items.push(newItem);
        saveItems();
    }
    else{
        editElement.innerText = value;
        displayAlert("value changed", "success");

        // update items array and local Storage
        items = items.map(function(item){
            if (item.id === editID){
               item.item = value;
            }
            return item;
        });
        saveItems();
    }
}

function editItem(e){
    const parentElement = e.currentTarget.parentElement;
    editID = Number(parentElement.dataset.id);
    editElement = parentElement.querySelector(".item-name");
    input.value = editElement.innerText;
    editFlag = true;
    submitBtn.innerText = "edit";
}

function deleteItem(e){
    const element = e.currentTarget.parentElement;
    const elementID = Number(element.dataset.id);
    list.removeChild(element);
    displayAlert("item removed", "warning");

    // update items array and local Storage
    items = items.filter(function(item){
        return item.id !== elementID;
    });
    saveItems();
}

function checkItem(e){
    const element = e.currentTarget.parentElement;
    const elementId = Number(element.dataset.id);
    items = items.map(function(item){
        if (item.id === elementId){
            if (item.checked){
                item.checked = false;
            }
            else{
                item.checked = true;
            }
        }
        return item;
    })
    saveItems();
    e.target.parentElement.classList.toggle("checked");
}


function setBackToDefalut(){
    input.value  = "";
    editFlag = false;
    editElement = null;
    editID = "";
    submitBtn.innerText = "submit";
}
// setup items

function setUpItems(){
    let savedItems = localStorage.getItem(ITEMS_KEY);
    if (savedItems !== null){
        savedItems = JSON.parse(savedItems);
        items = savedItems;
        items.forEach(function(item){
            createItem(item.id, item.item, item.checked);
        })
    }
}

function createItem(id, value, checked){
    const item = document.createElement("li");
    item.dataset.id = id;
    item.classList.add("grocery-item");
    item.innerHTML = `<button class="check-btn">
        <i class="far fa-check-circle fa-lg"></i>
        </button>
        <h3 class="item-name">${value}</h3>
        <button class="edit-btn">  
            <i class="far fa-edit"></i>
        </button>
        <button class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>`;

    // append child
    list.appendChild(item);

     // add event listerners to both buttons
    const editBtn = item.querySelector(".edit-btn");
    const deleteBtn = item.querySelector(".delete-btn");
    const checkBtn = item.querySelector(".check-btn");
    editBtn.addEventListener("click", editItem);
    deleteBtn.addEventListener("click", deleteItem);
    checkBtn.addEventListener("click", checkItem);

    if (checked){
        checkBtn.classList.add("checked");
    }
}


window,addEventListener("DOMContentLoaded", setUpItems);