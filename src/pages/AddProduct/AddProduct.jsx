import { useForm } from "react-hook-form";
import PageHeader from "../../components/Common/PageHeader";
import categories from "../../utils/categories";
import { addProduct } from "../../services/productService";

function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
  const result = await addProduct(data);

  if (result.success) {
    alert(result.message);
    reset();
  } else {
    alert(result.message);
  }
};

  return (
    <div>

      <PageHeader
        title="Add Product"
        subtitle="Add a new product to your inventory"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md space-y-5"
      >

        {/* Product Name */}

        <div>

          <label className="font-medium">
            Product Name
          </label>

          <input
            {...register("name")}
            type="text"
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Enter product name"
          />

        </div>

        {/* Category */}

        <div>

          <label className="font-medium">
            Category
          </label>

          <select
            {...register("category")}
            className="w-full border rounded-lg p-3 mt-2"
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            ))}

          </select>

        </div>

        {/* Price */}

        <div>

          <label className="font-medium">
            Price
          </label>

          <input
            {...register("price")}
            type="number"
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="₹"
          />

        </div>

        {/* Unit */}

        <div>

          <label className="font-medium">
            Unit
          </label>

          <select
            {...register("unit")}
            className="w-full border rounded-lg p-3 mt-2"
          >

            <option>Kg</option>
            <option>Gram</option>
            <option>Litre</option>
            <option>Packet</option>
            <option>Piece</option>

          </select>

        </div>

        {/* Stock */}

        <div>

          <label className="font-medium">
            Stock
          </label>

          <input
            {...register("stock")}
            type="number"
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        {/* Available */}

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            {...register("available")}
          />

          <label>
            Available
          </label>

        </div>

        <button
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
        >
          Save Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;