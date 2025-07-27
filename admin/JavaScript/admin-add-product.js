document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addProductForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);

        try {
            const response = await fetch('/spiceheritage/admin/products', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Product added successfully!');
                window.location.href = 'products.html';
            } else {
                alert('Error adding product: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    });
});
