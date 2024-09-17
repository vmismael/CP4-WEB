
function adicionarPorId() {
    const id = parseInt(document.getElementById('produto-id').value);
    const quantidade = parseInt(document.getElementById('produto-quantidade').value);


    const produtos = {
        1: { nome: 'Camiseta', valor: 29.99 },
        2: { nome: 'Calça Jeans', valor: 99.90 },
        3: { nome: 'Tênis', valor: 149.90 }
    };


    if (produtos[id]) {
        const { nome, valor } = produtos[id];
        adicionarProduto(id, nome, valor, quantidade);
        alert(`${quantidade}x ${nome} adicionado(s) ao carrinho.`);
    } else {
        alert('Produto com esse ID não encontrado.');
    }
}


function adicionarProdutoAnimado(id, nome, valor, quantidade) {
    adicionarProduto(id, nome, valor, quantidade);


    const button = event.target;
    const cartIcon = document.querySelector('.cart-icon');


    const buttonClone = button.cloneNode(true);
    const buttonRect = button.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();


    buttonClone.style.position = 'absolute';
    buttonClone.style.left = `${buttonRect.left}px`;
    buttonClone.style.top = `${buttonRect.top}px`;
    buttonClone.style.width = `${button.offsetWidth}px`;
    buttonClone.style.height = `${button.offsetHeight}px`;
    buttonClone.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
    buttonClone.style.zIndex = 1000;

    document.body.appendChild(buttonClone);


    setTimeout(() => {
        const translateX = cartRect.left - buttonRect.left;
        const translateY = cartRect.top - buttonRect.top;
        buttonClone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
        buttonClone.style.opacity = 0;
    }, 100);


    setTimeout(() => {
        buttonClone.remove();
    }, 1000);


    const cartCount = document.getElementById('cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + parseInt(quantidade);
}


function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade += parseInt(quantidade);
    } else {
        carrinho.push({ id, nome, valor, quantidade: parseInt(quantidade) });
    }


    localStorage.setItem('carrinho', JSON.stringify(carrinho));


    exibirCarrinho();
}


function exibirCarrinho() {
    const listaProdutos = document.getElementById('lista-produtos');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        listaProdutos.innerHTML = "Seu carrinho está vazio!";
    } else {
        listaProdutos.innerHTML = '';
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${produto.nome} - ${produto.quantidade}x R$${produto.valor.toFixed(2)}</span>
                <button onclick="removerProduto(${produto.id})">Remover</button>
            `;
            listaProdutos.appendChild(li);
        });
    }
}

function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(produto => produto.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function atualizarQuantidade(id, nome, valor) {
    const quantidade = document.getElementById(`quantidade-${id}`).value;
    adicionarProduto(id, nome, valor, quantidade);
}
