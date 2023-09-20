import React from "react";
import { useState, useEffect } from "react";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import { toast } from "react-toastify";

const Tabel = () => {
  const [open, setopen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [newProduct, setNewProduct] = useState({
    id: Math.floor(Math.random() * 100000),
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleInputChange = (e) => {
    // Menggunakan spread operator untuk menggabungkan perubahan dengan state existing
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (product) => {
    setEditProduct({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      id: product.id,
    });
    setIsEditVisible(true);
  };

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    id: null,
  });

  const handleAddProduct = (newProduct) => {
    if (!newProduct.title || !newProduct.price || !newProduct.category || !newProduct.description || !newProduct.image) {
      toast.error("tolong isi semua form dengan lengkap");
      return;
    }

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProduct({
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
    setError("");
  };
  useEffect(() => {
    // Mengambil data dari API menggunakan fetch dalam useEffect
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Menyimpan data dari API ke dalam state products
        setProducts(data);
        console.log(products);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    // Menggunakan fetch untuk menghapus produk berdasarkan ID
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Setelah produk dihapus, Anda dapat memperbarui tampilan dengan mengambil data baru dari API atau dengan cara lain sesuai kebutuhan Anda.
        // Contoh: Refresh daftar produk.
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        toast.success("delete success");
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus produk:", error);
      });
  };
  return (
    <div class="overflow-x-hidden">
      {open && (
        <AddProduct
          onAddProduct={(newProduct) => {
            handleAddProduct(newProduct);
          }}
        />
      )}
      <button type="button" onClick={() => setopen(!open)} className=" ml-5 mb-4 mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add product
      </button>

      {isEditVisible && (
        <EditProduct
          initialProduct={editProduct}
          onSaveEdit={(updatedProduct) => {
            fetch(`https://fakestoreapi.com/products/${updatedProduct.id}`, {
              method: "PUT",
              body: JSON.stringify(updatedProduct),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((json) => {
                console.log("Product updated:", json);
                const updatedProducts = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
                setProducts(updatedProducts);
                setIsEditVisible(false);
              })
              .catch((error) => console.error(error));
          }}
          onCancelEdit={() => setIsEditVisible(false)}
        />
      )}
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-3">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product Image
            </th>
            <th scope="col" class="px-6 py-3">
              Product name
            </th>
            <th scope="col" class="px-1 py-3">
              Description
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {products
            .slice()
            .reverse()
            .map((product) => (
              <tr key={product.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                  <img src={product.image} alt={product.title} className="" />
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                  {product.title}
                </th>
                <td class="pr-4 py-4">{product.description}</td>
                <td class="px-6 py-4">{product.category}</td>
                <td class="px-6 py-4">{product.price}</td>
                <td class="px-8 py-4 flex gap-2">
                  <button onClick={() => handleEditClick(product)} className="px-4 py-1 bg-green-500 text-white rounded-md ">
                    edit
                  </button>

                  <button className="px-4 py-1 bg-red-600 rounded-md text-white" onClick={() => handleDeleteProduct(product.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;
