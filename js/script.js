let modeButton = document.getElementById("toggle-mode");
let modeIcon = document.querySelector('#toggle-mode i');
let backGround = document.getElementById("back");
let inputElement = document.querySelector('.input');
let checkEmpty = document.querySelectorAll('.circle-empty');
let todoElements = document.querySelectorAll('.todo');
let todoHeaderElements = document.querySelectorAll('.todo h3');
let todoCheckElements = document.querySelectorAll('.todo div');
let optionElements = document.querySelectorAll('.options');
let optionButtonElements = document.querySelectorAll('.options button');
let optionsClearCompleted = document.querySelectorAll('.options .clear-completed button');
let optionshowFunButtonElements = document.querySelectorAll('.options .show-fun button');
let inputCheck = document.querySelector('.input div');
let inputField = document.querySelector('.input input');
let inputAdd = document.querySelector('.input button');
let mainList = document.querySelector('.main');

if (!localStorage.getItem("list")) {
    localStorage.setItem("list", "");
}
let todoList = localStorage.getItem("list");
console.log(todoList);

console.log(optionshowFunButtonElements);

//// Listeners

modeButton.addEventListener("click", toggleMode);
todoCheckElements.forEach((e, idx) => {
    e.addEventListener("click", () => {
        toggleCheck(e, idx);

    });
});
optionshowFunButtonElements.forEach((e, idx) => {
    e.addEventListener("click", () => {
        activate(e, idx);

    })
});
optionsClearCompleted.forEach((e, idx) => {
    e.addEventListener("click", () => {
        ClearCompleted();
    })
})
inputCheck.addEventListener("click", toggleInputCheck);
inputAdd.addEventListener("click", addTodo);

/// functions 
let darkmode = false;
let myListData = [];

addTodo();

function toggleMode() {
    if (modeIcon.getAttribute("class").includes("fa-moon")) {
        darkmode = true;
        modeIcon.setAttribute("class", "fas fa-sun");
        backGround.setAttribute("class", "background-img-dark");
        document.body.setAttribute("class", "bg-dark");
        inputElement.classList.add("bg-dark");
        inputElement.classList.add("color-dark");
        inputCheck.classList.add("circle-empty-dark");

        todoCheckElements.forEach((e) => {
            e.classList.add("circle-empty-dark");
        });
        todoElements.forEach((e) => {
            e.classList.add("bg-dark");


        });
        optionElements.forEach((e) => {
            e.classList.add("bg-dark");
            e.classList.add("color-dark");
        });
        todoHeaderElements.forEach((e) => {
            e.classList.add("color-dark");
            if (e.getAttribute("class").includes("completed")) {
                e.setAttribute("class", "completed-dark");
            }
        });

    } else {
        darkmode = false;
        modeIcon.setAttribute("class", "fas fa-moon");
        backGround.setAttribute("class", "background-img-light");
        document.body.setAttribute("class", "");
        inputElement.classList.remove("bg-dark");
        inputElement.classList.remove("color-dark");
        inputCheck.classList.remove("circle-empty-dark");
        todoCheckElements.forEach((e) => {
            e.classList.remove("circle-empty-dark");
        })
        todoElements.forEach((e) => {
            e.classList.remove("bg-dark");


        })
        optionElements.forEach((e) => {
            e.classList.remove("bg-dark");
            e.classList.remove("color-dark");
        })
        todoHeaderElements.forEach((e) => {
            e.classList.remove("color-dark");
            if (e.getAttribute("class").includes("completed-dark")) {
                e.setAttribute("class", "completed");
            }
        })

    }
}

function toggleCheck(e, idx) {
    console.log("hiiiiii");


    if (e.getAttribute("class").includes("circle-fill")) {
        if (darkmode) {
            e.setAttribute("class", "circle-empty");
            e.classList.add("circle-empty-dark");
            todoHeaderElements[idx].setAttribute("class", "");
            todoHeaderElements[idx].classList.add("color-dark");

        } else {
            e.setAttribute("class", "circle-empty");
            todoHeaderElements[idx].setAttribute("class", "");
        }

    } else {
        if (darkmode) {
            todoHeaderElements[idx].setAttribute("class", "completed-dark");
        } else {
            todoHeaderElements[idx].setAttribute("class", "completed");

        }
        e.setAttribute("class", "circle-fill");
    }
    localStorage.setItem("list", mainList.innerHTML);
    console.log(localStorage.getItem("list"));
}

function activate(e, idx) {
    optionshowFunButtonElements.forEach((btn) => {
        btn.classList.remove("active");
    })
    e.classList.add("active");
    let todoCompleted = [];
    let todoUnCompleted = [];
    todoCheckElements.forEach((e, idx) => {
        if (e.getAttribute("class").includes("circle-fill")) {
            todoCompleted.push(idx);
            console.log("hello");

        } else {
            todoUnCompleted.push(idx);
        }
    });
    console.log(todoCompleted);
    if (idx == 1) {
        todoCompleted.forEach((e) => {
            todoElements[e].style.display = "none";
        })
        todoUnCompleted.forEach((e) => {
            todoElements[e].style.display = "";
        })
    } else if (idx == 2) {
        todoCompleted.forEach((e) => {
            todoElements[e].style.display = "";
        })
        todoUnCompleted.forEach((e) => {
            todoElements[e].style.display = "none";
        })
    } else {
        todoCompleted.forEach((e) => {
            todoElements[e].style.display = "";
        })
        todoUnCompleted.forEach((e) => {
            todoElements[e].style.display = "";
        })
    }
}

function ClearCompleted() {
    let todoCompleted = [];
    todoCheckElements.forEach((e, idx) => {
        if (e.getAttribute("class").includes("circle-fill")) {
            todoCompleted.push(idx);
        }
    });
    console.log(todoCompleted);
    let j = 0;
    for (let i = 0; i < todoCompleted.length; i++) {

        removeTodo(todoCompleted[i - j]);

        j++;
    }

}

function toggleInputCheck() {
    e = inputCheck;
    if (e.getAttribute("class").includes("circle-fill")) {
        if (darkmode) {
            e.setAttribute("class", "circle-empty");
            e.classList.add("circle-empty-dark");
        } else {
            e.setAttribute("class", "circle-empty");
        }
    } else {
        e.setAttribute("class", "circle-fill");
    }
}


function addTodo() {

    let completed = () => {
        if (inputCheck.getAttribute("class").includes("fill")) {
            return "completed";
        } else {
            return "";
        }
    }

    let ourTodo = `
    <div class="todo">
        <div class="${inputCheck.getAttribute("class")}">
            <i class="fas fa-check"></i>
        </div>
        <h3 class="${completed()}">${inputField.value}</h3>
        <button>
            <i class="fas fa-times"></i>
        </button>
    </div>
    <string-split>
    `;


    if (inputField.value) {
        localStorage.setItem("list", `${ourTodo} ${localStorage.getItem("list")}`);
        inputField.value = "";
    }

    todoList = localStorage.getItem("list");
    mainList.innerHTML = todoList;
    modeButton = document.getElementById("toggle-mode");
    modeIcon = document.querySelector('#toggle-mode i');
    backGround = document.getElementById("back");
    inputElement = document.querySelector('.input');
    checkEmpty = document.querySelectorAll('.circle-empty');
    todoElements = document.querySelectorAll('.todo');
    todoHeaderElements = document.querySelectorAll('.todo h3');
    todoCheckElements = document.querySelectorAll('.todo div');
    optionElements = document.querySelectorAll('.options');
    optionButtonElements = document.querySelectorAll('.options button');
    optionshowFunButtonElements = document.querySelectorAll('.options .show-fun button');
    inputCheck = document.querySelector('.input div');
    inputField = document.querySelector('.input input');
    inputAdd = document.querySelector('.input button');
    mainList = document.querySelector('.main');

    let todoRemoveButton = document.querySelectorAll('.todo button');

    updateMode();

    modeButton.addEventListener("click", toggleMode);
    todoCheckElements.forEach((e, idx) => {
        e.addEventListener("click", () => {
            toggleCheck(e, idx);

        });
    });
    optionshowFunButtonElements.forEach((e, idx) => {
        e.addEventListener("click", () => {
            activate(e, idx);

        })
    });
    inputCheck.addEventListener("click", toggleInputCheck);
    inputAdd.addEventListener("click", addTodo);
    todoRemoveButton.forEach((e, idx) => {
        e.addEventListener("click", () => {
            removeTodo(idx);
        })
    })


}

function removeTodo(idx) {
    let myStringListData = localStorage.getItem("list");
    myListData = myStringListData.split("<string-split>");
    myStringListData = "";
    myListData.splice(idx, 1);
    for (let i = 0; i < myListData.length; i++) {
        if (i == myListData.length - 1) {
            myStringListData += `${myListData[i]}`;
        } else {
            myStringListData += `${myListData[i]} <string-split>`;
        }
    };
    localStorage.setItem("list", `${myStringListData}`);
    addTodo();
}

function updateMode() {
    if (modeIcon.getAttribute("class").includes("fa-sun")) {
        darkmode = true;
        inputCheck.classList.add("circle-empty-dark");
        todoCheckElements.forEach((e) => {
            e.classList.add("circle-empty-dark");
        })
        todoElements.forEach((e) => {
            e.classList.add("bg-dark");
        })

        todoHeaderElements.forEach((e) => {
            e.classList.add("color-dark");
            if (e.getAttribute("class").includes("completed")) {
                e.setAttribute("class", "completed-dark");
            }
        })
    } else {
        darkmode = false;
        todoCheckElements.forEach((e) => {
            e.classList.remove("circle-empty-dark");
        })
        todoElements.forEach((e) => {
            e.classList.remove("bg-dark");
        })
        todoHeaderElements.forEach((e) => {
            e.classList.remove("color-dark");
            if (e.getAttribute("class").includes("completed-dark")) {
                e.setAttribute("class", "completed");
            }
        })

    }
}