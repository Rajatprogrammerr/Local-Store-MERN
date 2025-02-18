// import { useProductStore } from "../store/product"
// import toast from "react-hot-toast"
// import { useState } from "react"

// const UpdateProduct = () => {
//   const { products, updateProduct } = useProductStore()
//   const [updatedProduct, setUpdatedProduct] = useState(products)

//   const handleSubmit = async (e) => {
//     e.PreventDefault()
//   }

//   const handleUpdate = async (pid, item) => {


//     const { success } = await updateProduct(pid, item)
//     if (success) {

//       toast.success("Product Updated")
//     } else {
//       toast.error("Failed to Update Product")
//     }
//   }

//   return (
//     <>
//       <div className=" min-h-[50vh] w-[50vw] mx-auto bg-gray-900 rounded-lg mt-4" >
//         <div className=" flex flex-col justify-center items-center ">
//           <h1 className="font-bold text-3xl text-emerald-600 my-4">Update Product</h1>
//           <div className="flex justify-center items-center">
//             <form onSubmit={handleSubmit} className="flex flex-col justify-center  gap-2">
//               <label className="font-bold relative ">Name</label>
//               <input type="text"
//                 value={updatedProduct.name}
//                 placeholder="New Name"
//                 onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
//                 className="p-3 rounded-lg border-2 border-green-500 w-[500px] bg-black" />
//               <label className="font-bold relative">Price</label>
//               <input type="number"
//                 value={updatedProduct.price}
//                 placeholder="New Price"
//                 onChange={(e) => { setUpdatedProduct({ ...updatedProduct, price: e.target.value }) }}
//                 className="p-3 rounded-lg border-2 border-green-500 w-[500px] bg-black" />
//               <label className="font-bold relative">Image</label>
//               <input name="image"
//                 value={updatedProduct.image}
//                 placeholder="New Image"
//                 onChange={(e) => { setUpdatedProduct({ ...updatedProduct, image: e.target.value }) }}
//                 className="p-3 rounded-lg border-2 border-green-500 w-[500px] bg-black" />
//               <div className="flex justify-center items-center">
//                 <button onClick={() => handleUpdate(products._id, updatedProduct)} className="font-bold rounded-lg border-2 border-green-500 w-[200px] bg-green-600 p-4 my-6 ">Update</button>
//               </div>
//             </form>
//           </div>
//         </div>

//       </div>
//     </>
//   )
// }

// export default UpdateProduct


import { useState, useEffect } from "react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { X } from 'lucide-react';

const UpdateProduct = () => {
  const { products, updateProduct } = useProductStore();
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const { id } = useParams()
  useEffect(() => {

    products.map((product) => {

      if (product._id === id) {
        setProduct({
          name: product.name || "",
          price: product.price || "",
          image: product.image || "",
        });
      }
    })
  }, [products]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form reload
    const { success } = await updateProduct(id, product); // Await asynchronous update
    if (success) {
      toast.success("Product Updated");
    } else {
      toast.error("Failed to Update Product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="min-h-[50vh] w-full max-w-[600px] mx-auto bg-gray-900 rounded-lg mt-36 mb-14 p-4">
      <div className="flex flex-col justify-center items-center relative">
        <h1 className="font-bold text-3xl text-emerald-600 my-4">Update Product</h1>
        <X
          className="w-8 h-8 cursor-pointer absolute top-4 right-4"
          onClick={() => window.history.back()}
        />
        <form
          onSubmit={handleUpdate}
          className="flex flex-col gap-6 justify-center items-center w-full"
        >
          <div className="flex flex-col w-full">
            <label className="font-bold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              placeholder="New Name"
              onChange={handleChange}
              className="p-3 rounded-lg border-2 border-green-500 bg-black w-full max-w-[500px] text-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-bold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              placeholder="New Price"
              onChange={handleChange}
              className="p-3 rounded-lg border-2 border-green-500 bg-black w-full max-w-[500px] text-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-bold mb-1">Image</label>
            <input
              type="text"
              name="image"
              value={product.image}
              placeholder="New Image URL"
              onChange={handleChange}
              className="p-3 rounded-lg border-2 border-green-500 bg-black w-full max-w-[500px] text-white"
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              className="font-bold rounded-lg border-2 border-green-500 bg-green-600 p-4 my-6 w-full max-w-xs"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default UpdateProduct;
