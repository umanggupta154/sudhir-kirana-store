import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";
import { getProducts } from "../../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const data = await getProducts();

    setProducts(data);
    setLoading(false);
  }

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage all products of Sudhir Kirana Store"
      />

      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Product..."
          className="border rounded-lg px-4 py-2 w-80"
        />

        <Link
          to="/add-product"
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-500"
                >
                  Loading Products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    ₹ {product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    {product.available ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Out of Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;