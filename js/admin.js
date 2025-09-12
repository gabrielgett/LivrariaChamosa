import { getBooks, addBook, updateBook, deleteBook } from './storage.js';

const bookForm = document.getElementById('book-form');
const bookIdInput = document.getElementById('book-id');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('imageUrl');
const cancelEditBtn = document.getElementById('cancel-edit');
const adminBookListContainer = document.getElementById('admin-book-list');

// Função para renderizar a lista de livros na área de admin
function renderAdminList() {
    const books = getBooks();
    adminBookListContainer.innerHTML = '';

    if (books.length === 0) {
        adminBookListContainer.innerHTML = '<p>Nenhum livro cadastrado.</p>';
        return;
    }

    const bookTable = document.createElement('table');
    bookTable.innerHTML = `
        <thead>
            <tr>
                <th>Capa</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Preço</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            ${books.map(book => `
                <tr data-id="${book.id}">
                    <td><img src="${book.imageUrl}" alt="${book.title}" width="50"></td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>R$ ${book.price.toFixed(2).replace('.', ',')}</td>
                    <td class="action-buttons">
                        <button class="btn btn-sm btn-edit">Editar</button>
                        <button class="btn btn-sm btn-danger btn-delete">Excluir</button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    adminBookListContainer.appendChild(bookTable);
}

// Função para limpar o formulário e resetar seu estado
function resetForm() {
    bookForm.reset();
    bookIdInput.value = ''; // Limpa o ID oculto
    bookForm.querySelector('button[type="submit"]').textContent = 'Salvar Livro';
    cancelEditBtn.style.display = 'none';
}

// Preenche o formulário para edição
function fillFormForEdit(bookId) {
    const books = getBooks();
    const bookToEdit = books.find(book => book.id === bookId);

    if (bookToEdit) {
        bookIdInput.value = bookToEdit.id;
        titleInput.value = bookToEdit.title;
        authorInput.value = bookToEdit.author;
        priceInput.value = bookToEdit.price;
        imageUrlInput.value = bookToEdit.imageUrl;

        bookForm.querySelector('button[type="submit"]').textContent = 'Atualizar Livro';
        cancelEditBtn.style.display = 'inline-block';
        window.scrollTo(0, 0); // Rola para o topo para ver o formulário
    }
}

// Evento de submit do formulário (Criar e Atualizar)
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookData = {
        title: titleInput.value,
        author: authorInput.value,
        price: parseFloat(priceInput.value),
        imageUrl: imageUrlInput.value,
    };

    const bookId = parseInt(bookIdInput.value);

    if (bookId) {
        // Atualizar
        updateBook(bookId, bookData);
    } else {
        // Criar
        addBook(bookData);
    }

    resetForm();
    renderAdminList();
});

// Evento de clique na lista de livros para Editar ou Deletar
adminBookListContainer.addEventListener('click', (e) => {
    const target = e.target;
    const parentRow = target.closest('tr');
    if (!parentRow) return;

    const bookId = parseInt(parentRow.dataset.id);

    // Botão de Editar
    if (target.classList.contains('btn-edit')) {
        fillFormForEdit(bookId);
    }

    // Botão de Deletar
    if (target.classList.contains('btn-delete')) {
        if (confirm('Tem certeza que deseja excluir este livro?')) {
            deleteBook(bookId);
            renderAdminList();
        }
    }
});

// Botão para cancelar a edição
cancelEditBtn.addEventListener('click', resetForm);

// Carregamento inicial da página
document.addEventListener('DOMContentLoaded', renderAdminList);