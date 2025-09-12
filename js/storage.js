const initialBooks = [
    {
        id: Date.now() + 1, // ID único baseado no tempo
        title: "A Revolução dos Bichos",
        author: "George Orwell",
        price: 35.50,
        imageUrl: "https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: Date.now() + 2,
        title: "O Senhor dos Anéis: A Sociedade do Anel",
        author: "J.R.R. Tolkien",
        price: 59.90,
        imageUrl: "https://m.media-amazon.com/images/I/8135vrbpp1L._AC_UF1000,1000_QL80_.jpg"
    }
];

const DB_KEY = 'books_db';

// Função para obter todos os livros
export function getBooks() {
    const db = localStorage.getItem(DB_KEY);
    if (!db) {
        // Se não houver nada no localStorage, salva os livros iniciais
        localStorage.setItem(DB_KEY, JSON.stringify(initialBooks));
        return initialBooks;
    }
    return JSON.parse(db);
}

// Função para salvar todos os livros (sobrescreve o que existe)
function saveBooks(books) {
    localStorage.setItem(DB_KEY, JSON.stringify(books));
}

// Função para adicionar um novo livro
export function addBook(book) {
    const books = getBooks();
    const newBook = {
        id: Date.now(), // ID único
        ...book
    };
    books.push(newBook);
    saveBooks(books);
}

// Função para atualizar um livro existente
export function updateBook(bookId, updatedBookData) {
    let books = getBooks();
    books = books.map(book => {
        if (book.id === bookId) {
            return { ...book, ...updatedBookData };
        }
        return book;
    });
    saveBooks(books);
}

// Função para deletar um livro
export function deleteBook(bookId) {
    let books = getBooks();
    books = books.filter(book => book.id !== bookId);
    saveBooks(books);
}