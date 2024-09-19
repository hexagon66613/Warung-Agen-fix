const products = [];
let nextId = 1;

module.exports = (req, res) => {
    if (req.method === 'GET') {
        return res.status(200).json(products);
    }

    if (req.method === 'POST') {
        try {
            const newProduct = req.body;
            newProduct.id = nextId++;
            newProduct.qty = Number(newProduct.qty); // Ensure qty is a number
            products.push(newProduct);
            return res.status(201).json({ message: 'Product added successfully', product: newProduct });
        } catch (error) {
            console.error('Error adding product:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'PATCH') {
        const { id, price, qty } = req.body; 
        const existingProductIndex = products.findIndex(product => product.id === id);
        
        if (existingProductIndex !== -1) {
            const existingProduct = products[existingProductIndex];
            const updatedProduct = {
                ...existingProduct,
                price: price, // Update price
                qty: existingProduct.qty + Number(qty) // Sum quantity
            };
            products[existingProductIndex] = updatedProduct;
            return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;
        const productIndex = products.findIndex(product => product.id === Number(id));

        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
};
