"use client";

import React, { useEffect, useState } from 'react';
import { Trash, Edit } from "lucide-react";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin');
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setIsPopupOpen(true);
    };

    const confirmDelete = async () => {
       
        try {
            const res = await fetch(`/api/admin/${productToDelete}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setIsPopupOpen(false);
                toast.success("Product Deleted Successfully")
                await fetchProducts(); // Refetch products after deletion
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error("Error deleting product")
        }
        setIsPopupOpen(false);
        await fetchProducts(); // Refetch products
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsEditPopupOpen(true);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/admin/${editingProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingProduct),
        });

        if (res.ok) {
            setIsEditPopupOpen(false);
            await fetchProducts(); // Refetch products
        } else {
            console.error('Failed to update product');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <table className='min-w-full divide-y divide-gray-700'>
                <thead className='bg-gray-700'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Product</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Price</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                    {products.map((product) => (
                        <tr key={product._id} className='hover:bg-gray-700'>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 h-10 w-10'>
                                        <img className='h-10 w-10 rounded-full object-cover' src={product.image} alt={product.name} />
                                    </div>
                                    <div className='ml-4'>
                                        <div className='text-sm font-medium text-white'>{product.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                                <button
                                    onClick={() => handleDeleteClick(product._id)}
                                    className='text-red-400 hover:text-red-300'
                                >
                                    <Trash className='h-5 w-5 mr-2' />
                                </button>
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className={`p-1 rounded-full ${product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"} hover:bg-yellow-500 transition-colors duration-200`}
                                >
                                    <Edit className='h-5 w-5' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Popup */}
            {isPopupOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-gray-500 rounded-lg shadow-lg p-6'>
                        <h2 className='text-lg font-bold text-white'>Confirm Deletion</h2>
                        <p className='mt-4 text-white'>Are you sure you want to delete this product?</p>
                        <div className='mt-6 flex justify-end'>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className='px-4 py-2 mr-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-300'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className='px-4 py-2 text-white bg-red-500 rounded hover:bg-gray-400'
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Popup */}
            {isEditPopupOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-gray-500 rounded-lg shadow-lg p-6'>
                        <h2 className='text-lg font-bold text-white'>Edit Product</h2>
                        <form onSubmit={handleUpdateProduct} className='mt-4'>
                            <div className='mb-4'>
                                <label className='block text-gray-300'>Product Name</label>
                                <input
                                    type='text'
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    className='mt-1 block w-full p-2 bg-gray-700 text-white rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-300'>Price</label>
                                <input
                                    type='number'
                                    value={editingProduct.price}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                    className='mt-1 block w-full p-2 bg-gray-700 text-white rounded'
                                    required
                                />
                            </div>
                            <div className='mt-6 flex justify-end'>
                                <button
                                    type='button'
                                    onClick={() => setIsEditPopupOpen(false)}
                                    className='px-4 py-2 mr-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-400'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-4 py-2 text-white bg-green-500 rounded hover:bg-gray-400'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default ProductList;