import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";

import PageHeader from "../../components/Common/PageHeader";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";


function Products() {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");





  useEffect(() => {

    loadProducts();

  }, []);





  async function loadProducts() {

    setLoading(true);

    const data = await getProducts();

    setProducts(data);

    setLoading(false);

  }





  async function handleDelete(id) {


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );


    if (!confirmDelete) return;



    const result =
      await deleteProduct(id);



    if (result.success) {

      alert(result.message);

      loadProducts();

    } 
    else {

      alert(result.message);

    }

  }







  const filteredProducts =
    products.filter((product) => {


      const keyword =
        search.toLowerCase();



      return (

        product.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        product.brand
          ?.toLowerCase()
          .includes(keyword)

        ||

        product.category
          ?.toLowerCase()
          .includes(keyword)

      );


    });









  return (

    <div>


      <PageHeader

        title="Products"

        subtitle="Manage your inventory products"

      />







      {/* TOP BAR */}



      <div className="
        flex flex-col md:flex-row 
        justify-between gap-4 mb-6
      ">



        <div className="
          relative w-full md:w-96
        ">


          <Search

            size={18}

            className="
            absolute left-3 top-3.5
            text-gray-400
            "

          />


          <input

            type="text"

            placeholder="Search products..."

            value={search}

            onChange={
              (e)=>setSearch(e.target.value)
            }

            className="
            border rounded-lg
            pl-10 pr-4 py-3
            w-full
            focus:outline-none
            focus:ring-2
            focus:ring-green-600
            "

          />


        </div>






        <Link

          to="/add-product"

          className="
          bg-green-700
          hover:bg-green-800
          text-white
          px-6 py-3
          rounded-lg
          "

        >

          + Add Product

        </Link>



      </div>









      {/* TABLE */}



      <div className="
        bg-white
        rounded-xl
        shadow-md
        overflow-x-auto
      ">



        <table className="w-full">



          <thead className="bg-gray-100">


            <tr>


              <th className="text-left p-4">
                Product
              </th>


              <th className="text-left p-4">
                Category
              </th>


              <th className="text-left p-4">
                Pricing
              </th>


              <th className="text-left p-4">
                Stock
              </th>


              <th className="text-left p-4">
                Profit
              </th>


              <th className="text-left p-4">
                Status
              </th>


              <th className="text-center p-4">
                Actions
              </th>


            </tr>


          </thead>








          <tbody>



          {
            loading ? (


              <tr>

                <td
                  colSpan="7"
                  className="
                  text-center
                  p-8
                  text-gray-500
                  "
                >

                  Loading Products...

                </td>


              </tr>



            )



            :



            filteredProducts.length === 0 ? (


              <tr>


                <td

                  colSpan="7"

                  className="
                  text-center
                  p-8
                  text-gray-500
                  "

                >

                  No Products Found

                </td>


              </tr>



            )



            :



            filteredProducts.map((product)=>(



              <tr

                key={product.id}

                className="
                border-t
                hover:bg-gray-50
                "

              >






                {/* PRODUCT */}



                <td className="p-4">


                  <div className="
                    flex items-center gap-4
                  ">


                    {
                      product.image ? (


                        <img

                          src={product.image}

                          className="
                          w-14 h-14
                          rounded-lg
                          object-cover
                          "

                        />


                      )

                      :

                      (

                        <div

                          className="
                          w-14 h-14
                          bg-gray-100
                          rounded-lg
                          flex items-center
                          justify-center
                          "

                        >

                          📦

                        </div>


                      )

                    }



                    <div>


                      <p className="
                        font-semibold
                      ">

                        {product.name}

                      </p>


                      <p className="
                        text-sm text-gray-500
                      ">

                        {product.brand || "No Brand"}

                      </p>


                    </div>


                  </div>


                </td>










                {/* CATEGORY */}



                <td className="p-4">


                  <span className="
                    bg-blue-100
                    text-blue-700
                    px-3 py-1
                    rounded-full
                    text-sm
                  ">

                    {product.category}

                  </span>


                </td>









                {/* PRICE */}



                <td className="p-4">


                  <p className="font-medium">

                    ₹ {product.sellingPrice || 0}

                  </p>


                  <p className="
                    text-sm text-gray-500
                  ">

                    Buy ₹{product.purchasePrice || 0}

                  </p>


                </td>









                {/* STOCK */}



                <td className="p-4">


                  <p>

                    {product.stock || 0}
                    {" "}
                    {product.unit}

                  </p>



                  {

                    Number(product.stock)
                    <=
                    Number(product.minimumStock || 0)

                    &&


                    <p className="
                      text-xs
                      text-orange-600
                      mt-1
                    ">

                      ⚠ Low Stock

                    </p>


                  }



                </td>










                {/* PROFIT */}



                <td className="p-4">


                  <span className="
                    bg-green-100
                    text-green-700
                    px-3 py-1
                    rounded-full
                    text-sm
                  ">

                    {product.profitPercent || 0}%

                  </span>


                </td>










                {/* STATUS */}



                <td className="p-4">


                  {
                    product.available ?


                    <span className="
                      bg-green-100
                      text-green-700
                      px-3 py-1
                      rounded-full
                      text-sm
                    ">

                      Available

                    </span>


                    :


                    <span className="
                      bg-red-100
                      text-red-700
                      px-3 py-1
                      rounded-full
                      text-sm
                    ">

                      Out

                    </span>

                  }


                </td>










                {/* ACTION */}



                <td className="p-4">


                  <div className="
                    flex
                    justify-center
                    gap-4
                  ">


                    <Link

                      to={`/edit-product/${product.id}`}

                      className="
                      text-blue-600
                      hover:text-blue-800
                      "

                    >

                      <Pencil size={18}/>

                    </Link>





                    <button

                      onClick={()=>
                        handleDelete(product.id)
                      }

                      className="
                      text-red-600
                      hover:text-red-800
                      "

                    >

                      <Trash2 size={18}/>

                    </button>



                  </div>


                </td>





              </tr>


            ))

          }



          </tbody>



        </table>



      </div>



    </div>

  );

}


export default Products;