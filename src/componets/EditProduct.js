import React, { useState } from "react";
import { toast } from "react-toastify";

function EditProduct({ initialProduct, onSaveEdit, onCancelEdit }) {
  const [editedProduct, setEditedProduct] = useState(initialProduct);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveEdit(editedProduct);
    toast.success("edit success");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white w-1/3 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={editedProduct.image}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={editedProduct.title}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={editedProduct.category}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <textarea
              placeholder="Description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Save
            </button>
            <button type="button" onClick={onCancelEdit} className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 ml-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
