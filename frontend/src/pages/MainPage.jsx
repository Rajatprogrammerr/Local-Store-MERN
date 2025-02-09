import { useProductStore } from "../store/product"
import { useEffect } from "react"
import { Trash2, BookUp } from 'lucide-react';
import toast from "react-hot-toast";


import { Link } from "react-router-dom";


const MainPage = () => {
    const { products, fetchProducts, deleteProduct } = useProductStore()

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const handleDelete = async (pid) => {
        const { success } = await deleteProduct(pid)
        if (success) {

            toast.success("Product Deleted")
        } else {
            toast.error("Failed to delete Product")
        }
    }



    return (
        <>
            <div className=" flex justify-center items-center gap-4 p-4 mt-24 mb-14">
                {Array.isArray(products) && products.length === 0 && (
                    <div>
                        <span className="text-white">No products available</span>{"  "}
                        <Link to={'/create'}>
                            <span className="cursor-pointer text-green-600 hover:underline">Create Product</span>
                        </Link>
                    </div>
                )}
                {Array.isArray(products) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((item) => (
                            <div key={item._id} className="overflow-hidden">
                                <div className="flex flex-col justify-around items-center min-w-[300px] min-h-[300px] p-4 rounded-lg bg-gray-900">
                                    <img src={item.image} alt={item.name} className="w-48 h-48 object-cover mr-4 rounded-lg" />
                                    <div className="flex flex-col justify-center items-center ">
                                        <span className="text-xl font-semibold text-white mt-2">{item.name}</span>
                                        <span className="text-lg text-gray-500">${item.price}</span>
                                    </div>
                                    <div className="flex space-x-10 mt-4">
                                        <Link to={`/update/${item._id}`}><BookUp className="text-green-600 cursor-pointer w-8 h-8" /></Link>
                                        <Trash2 className="text-red-500 cursor-pointer w-8 h-8" onClick={() => handleDelete(item._id)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default MainPage
