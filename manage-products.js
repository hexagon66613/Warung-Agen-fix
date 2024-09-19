let products = []; // Start with an empty array to fetch products from the API

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    document.getElementById('add-product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const qty = document.getElementById('product-qty').value;

        const existingProduct = products.find(product => product.name === name);
        
        if (existingProduct) {
            await updateProduct({ id: existingProduct.id, price, qty });
        } else {
            await addProduct({ name, price, qty });
        }
        fetchProducts(); // Refresh product list
    });
});

// Fetch and display products
async function fetchProducts() {
    const response = await fetch('https://warung-agen.vercel.app/api/products', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
    });
    products = await response.json(); // Store products globally
    displayProducts(products);
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h4>${product.name} - Rp${product.price} (Qty: ${product.qty})</h4>
            <button onclick="removeProduct(${product.id})">Remove</button>
        `;
        productList.appendChild(productItem);
    });
}

// Add a new product
async function addProduct(product) {
    await fetch('https://warung-agen.vercel.app/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(product)
    });
}

// Update an existing product
async function updateProduct(product) {
    await fetch('https://warung-agen.vercel.app/api/products', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(product)
    });
}

// Remove a product
async function removeProduct(productId) {
    await fetch(`https://warung-agen.vercel.app/api/products?id=${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
    });
    fetchProducts(); // Refresh product list
}

// Logout function
function logout() {
    localStorage.removeItem('adminToken');
    window.location.href = 'admin-login.html';
}
