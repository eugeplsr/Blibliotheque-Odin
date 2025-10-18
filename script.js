const myLibrary = [];

const baliseDialog = document.querySelector("dialog");
const showButton = document.querySelector(".ajouter-livre_button");
const baliseForm = document.querySelector("form");

//Contructeur de Book
function Book(title, author, numberOfPages, isRead) {
    this.title = title ;
    this.author = author ;
    this.numberOfPages = numberOfPages ;
    this.id = crypto.randomUUID();
    this.isRead = isRead ;
    if(isRead==0){
        this.statut = "not read yet"
    }else{
        this.statut = "book already read"
    }
    // Fonction pour mettre à jour le statut en cas de changement
    this.toggleRead = function() {
        this.isRead = 1;
        this.statut = "book already read";
    }

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.isRead} and ID=${this.statut}`;
    }
}

//Fonction pour ajouter un livre à la librairie
function addBookToLibrary(title, author, numberOfPages, isRead) {
    newBook = new Book(title,author,numberOfPages,isRead);
    myLibrary.push(newBook);
}

//Fonction pour afficher les livres de la librairie
function displayBooks() {
    const container = document.querySelector('.mes-livres_cards');
    container.innerHTML = ``; //On vide d'abord tout le contenu

    myLibrary.forEach((book) => { 
        const card_content = document.createElement("div");
        card_content.className = "book_card";
        card_content.dataset.id = book.id;
        let card = `
                <h3>Titre du livre : ${book.title}</h3>
                <h4>Auteur : ${book.author}</h4>
                <p>Nombre de pages : ${book.numberOfPages}</p>
                <p> Statut : ${book.statut}</p>
                <button class="delete_button">Supprimer ce livre</button>
            `
        if(book.isRead==0){
            card = card + '<button class="isRead_button">Lecture finie</button>'
        }
        card_content.innerHTML = card ;
        container.appendChild(card_content);

        //Évènement si on appuit sur le bouton "supprimer"
        const baliseDelete = card_content.querySelector('.delete_button');
        baliseDelete.addEventListener("click", () => {
            const bookId = card_content.dataset.id;
            deleteBook(bookId);
        });
        //Évènement si on appuit sur le bouton "lecture finie"
        const baliseLecture = card_content.querySelector('.isRead_button');
        if(baliseLecture){
            console.log(book.isRead);
            baliseLecture.addEventListener("click", () => {
                book.toggleRead();
                displayBooks();
            });
        }
    });
}

//Afficher le formulaire pour ajouter un livre
showButton.addEventListener("click", () => {
  baliseDialog.showModal();
});

//Supprimer un livre de la bibliotheque
function deleteBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

//Gérer le formulaire 
baliseForm.addEventListener("submit", (event) => {
        // On empêche le comportement par défaut
        event.preventDefault();
        //Récuperer les champs du formulaire
        const baliseNewBookTitle = document.getElementById("newBookTitle");
        const addedBookTitle = baliseNewBookTitle.value;
        const baliseNewBookAuthor = document.getElementById("newBookAuthor");
        const addedBookAuthor = baliseNewBookAuthor.value;
        const baliseNewBookNumberPages = document.getElementById("newBookNumberPages");
        const addedBookPages = baliseNewBookNumberPages.value;
        const baliseNewBookIsRead = document.querySelectorAll('input[name="isRead"]');
        let newBookIsRead = "";
        for (let i = 0; i < baliseNewBookIsRead.length; i++) {
            if (baliseNewBookIsRead[i].checked) {
                newBookIsRead = baliseNewBookIsRead[i].value;
                break;
            }
        }
        let addedBookStatut = 0;
        if(newBookIsRead == "Oui") {
            addedBookStatut = 1 ;
        }
        addBookToLibrary(addedBookTitle, addedBookAuthor, addedBookPages, addedBookStatut);
        displayBooks();
        baliseDialog.close();
        baliseForm.reset();
});


// Ajouter quelques livres de test
addBookToLibrary("1984", "George Orwell", 328, 1);
addBookToLibrary("Le Petit Prince", "Antoine de Saint-Exupéry", 96, 0);
addBookToLibrary("Harry Potter", "J.K. Rowling", 320, 1);

// Afficher les livres
displayBooks();


//Tester la fonction info de mon constructeur Book
/*const book = new Book("1984", "George Orwell", 328, 1);
console.log(book.info());*/

//Tester la fonction addBookToLibrary()
/*addBookToLibrary("1984", "George Orwell", 328, 1);
const myLibraryLength = myLibrary.length ;
console.log(myLibraryLength);
console.log(myLibrary[0].info());*/
