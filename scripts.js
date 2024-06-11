const library = [];
const newBookButton = document.querySelector(`.newBookButton`);
const formContainer = document.querySelector(`.formContainer`);
const formContainerSubmitButton = document.querySelector(`.formContainerSubmitButton`);
const title = document.querySelector(`#title`);
const author = document.querySelector(`#author`);
const pageCount = document.querySelector(`#pageCount`);
const haveRead = document.querySelector(`#haveRead`);
const genre = document.querySelector(`#genre`);
const listContainer = document.querySelector(`.listContainer`);
const books = [];
const bookCards = [];


formContainerSubmitButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearInputs();
    displayBooks();
    

})

listContainer.addEventListener(`click`, (e) => {
    if (e.target.textContent == `Delete`) {
        if (e.target.dataset.bookIndex) {
            books.splice(e.target.dataset.bookIndex,1);
            displayBooks();
        }
    }
    if (e.target.id == `haveRead`) {
        if (e.target.checked == true) {
            books[e.target.dataset.bookIndex].haveRead = true;
        } else {
            books[e.target.dataset.bookIndex].haveRead = false;
        }
        console.log(books[e.target.dataset.bookIndex].haveRead);
        //need to make it to where the check box communicates to the actual haveRead key in the books object.
    }
});

newBookButton.addEventListener(`click`, () => {
    displayNewBookInput()
});

function displayNewBookInput() {
    if (formContainer.style.display == `` ||    formContainer.style.display == `none`) {
        formContainer.style.display = `Block`;
    }
    else {
        formContainer.style.display = `none`;
    }
}

function Book(title,author,pageCount,haveRead,genre) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
    this.genre = genre;
}

function addBookToLibrary() {
    books.push(new Book(title.value, author.value, pageCount.value, haveRead.checked, genre.value));
}

function clearInputs() {
    title.value = ``;
    author.value = ``;
    pageCount.value = ``;
    haveRead.value = ``;
    genre.value = ``;
}

function displayBooks() {
    listContainer.innerHTML = ``;
    books.forEach(element => {
        bookCards[books.indexOf(element)] = document.createElement("div");
        bookCards[books.indexOf(element)].innerHTML = 
`
<div class="listCard">
    <div class="listCardInfo">
        <div>
            <p>Title: ${element.title}</p>
            <p>Author ${element.author}</p>
        </div>
        <div>
            <p>Page Count: ${element.pageCount}</p>
            <p>Genre ${element.genre}</p>
            <p>Have Read: <input data-book-index="${books.indexOf(element)}"type="checkbox" name="haveRead" id="haveRead" ${haveReadCheckbox(element.haveRead)}></p>
        </div>
    </div>
    <div class="listCardDeleteButton">
        <button data-book-index="${books.indexOf(element)}" class="deleteButton" type="button">Delete</button>
    </div>
</div>
`;
        listContainer.append(bookCards[books.indexOf(element)]);       
});
}

function haveReadCheckbox(haveReadBoolean) {
    if(haveReadBoolean == true) {
        return `checked`;
    } else {
        return;
    }
}