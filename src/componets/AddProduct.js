import React, { useState } from "react";
import { toast } from "react-toastify";

function AddProduct({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    id: Math.floor(Math.random() * 1000),
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [isAddProductCardVisible, setIsAddProductCardVisible] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.category || !newProduct.description || !newProduct.image) {
      toast.error("masukan data semuanya dengan lengkap");
      return;
    }

    onAddProduct(newProduct);
    setNewProduct({
      id: Math.floor(Math.random() * 1000), // id acak berikutnya
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
    setError("");
    setIsAddProductCardVisible(false); // open and closec card

    // Tampilkan notifikasi bahwa produk berhasil ditambahkan
    console.log("Product ditambahkan :)", newProduct);
  };

  const handleCancel = () => {
    setNewProduct({
      id: Math.floor(Math.random() * 1000), // Bilangan acak berikutnya
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
    setError("");
    setIsAddProductCardVisible(false); // Mengatur false = not visible
  };

  return (
    <div>
      {isAddProductCardVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 font-sans">
          <div className="bg-white w-1/3 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 ">Add New Product</h2>
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500 mb-2"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500 mb-2"
            />
            {error && <p className="text-red-500 mb-2 text-start">{error}</p>}
            <div className="flex justify-end">
              <button onClick={handleAddProduct} className="bg-green-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Add Product
              </button>
              <button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 ml-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
