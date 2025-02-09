import { create } from 'zustand'
import axios from 'axios'



export const useProductStore = create((set) => ({
    products: [],
    isCreating: false,
    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
        const res = await axios.get(`/api/products/`)
        console.log("Fetched products: ", res.data) // Check the response
        set({ products: res.data.data }) // Ensure it's an array
    },


    createProduct: async (product) => {
        try {
            set({ isCreating: true });
            const res = await axios.post('/api/products', product)
            set((state) => ({
                products: [...state.products, res.data],
                isCreating: false,
            }))

            return { success: true }
        } catch (error) {
            console.log(error.message)
            set({ products: [], isCreating: false })
            return { success: false }
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        try {

            const res = await axios.put(`/api/products/${pid}`, updatedProduct, {

            });


            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? res.data.data : product
                )
            }));

            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            console.error("Error updating product:", error.message);
            return { success: false, message: "Failed to update product" };
        }
    },
    deleteProduct: async (pid) => {
        try {
            await axios.delete(`/api/products/${pid}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== pid)
            }));
            return { success: true, message: "Product deleted successfully" };
        } catch (error) {
            console.error("Error deleting product:", error.message);
            return { success: false, message: "Failed to delete product" };
        }
    }
}))



//     updateProduct: async (pid, updatedProduct) => {
// 		const res = await fetch(`/api/products/${pid}`, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(updatedProduct),
// 		});
// 		const data = await res.json();
// 		if (!data.success) return { success: false, message: data.message };

// 		// update the ui immediately, without needing a refresh
// 		set((state) => ({
// 			products: state.products.map((product) => (product._id === pid ? data.data : product)),
// 		}));

// 		return { success: true, message: data.message };
// 	},


// }))


// import { create } from "zustand";

// export const useProductStore = create((set) => ({
//     products: [],
//     setProducts: (products) => set({ products }),
//     createProduct: async (newProduct) => {
//         if (!newProduct.name || !newProduct.image || !newProduct.price) {
//             return { success: false, message: "Please fill in all fields." };
//         }
//         const res = await fetch("/api/products", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newProduct),
//         });
//         const data = await res.json();
//         set((state) => ({ products: [...state.products, data.data] }));
//         return { success: true, message: "Product created successfully" };
//     },
//     fetchProducts: async () => {
//         const res = await fetch("/api/products");
//         const data = await res.json();
//         set({ products: data.data });
//     },
//     deleteProduct: async (pid) => {
//         const res = await fetch(`/api/products/${pid}`, {
//             method: "DELETE",
//         });
//         const data = await res.json();
//         if (!data.success) return { success: false, message: data.message };

//         // update the ui immediately, without needing a refresh
//         set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
//         return { success: true, message: data.message };
//     },
//     updateProduct: async (pid, updatedProduct) => {
//         const res = await fetch(`/api/products/${pid}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedProduct),
//         });
//         const data = await res.json();
//         if (!data.success) return { success: false, message: data.message };

//         // update the ui immediately, without needing a refresh
//         set((state) => ({
//             products: state.products.map((product) => (product._id === pid ? data.data : product)),
//         }));

//         return { success: true, message: data.message };
//     },
// }));