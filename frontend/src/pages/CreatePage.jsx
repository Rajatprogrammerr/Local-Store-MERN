import { useState } from "react"
import { useProductStore } from "../store/product"
import toast from "react-hot-toast"

const CreatePage = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: ""
    })

    const { createProduct } = useProductStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success } = await createProduct(product)
        if (success) {
            toast.success("Product Created")
            setProduct({ name: "", price: "", image: "" })
        } else {
            toast.error("Product Failed to Create")
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-full">
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        placeholder="Product Name"
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="p-4 rounded-lg border-2 border-green-500 bg-black w-full max-w-[500px] text-white"
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        placeholder="Product Price"
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        className="p-4 rounded-lg border-2 border-green-500 bg-black w-full max-w-[500px] text-white"
                    />
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        placeholder="Product Image URL"
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        className="p-4 rounded-lg border-2 border-green-500 bg-black w-full max-w-[500px] text-white"
                    />
                    <button
                        type="submit"
                        className="bg-green-700 font-bold p-3 text-lg hover:bg-green-800 w-full max-w-[200px] rounded-md"
                    >
                        Create Product
                    </button>
                </form>
            </div>

        </>
    )
}

export default CreatePage
