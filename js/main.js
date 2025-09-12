import { getBooks } from './storage.js';

// Função para renderizar os livros no catálogo
function renderCatalog() {
    const books = getBooks();
    const catalogContainer = document.getElementById('book-catalog');
    catalogContainer.innerHTML = ''; // Limpa o conteúdo atual

    if (books.length === 0) {
        catalogContainer.innerHTML = '<p>Nenhum livro disponível no momento.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = `
            <div class="book-card">
                <img src="${book.imageUrl}" alt="Capa do livro ${book.title}">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <span class="price">R$ ${book.price.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        `;
        catalogContainer.innerHTML += bookCard;
    });
}

// Evento que é disparado quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', renderCatalog);