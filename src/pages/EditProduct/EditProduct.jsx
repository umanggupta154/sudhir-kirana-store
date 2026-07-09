import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import PageHeader from "../../components/Common/PageHeader";
import categories from "../../utils/categories";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";


function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);



  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm();



  const purchasePrice = useWatch({
    control,
    name: "purchasePrice",
  });


  const sellingPrice = useWatch({
    control,
    name: "sellingPrice",
  });



  useEffect(() => {
    loadProduct();
  }, []);




  useEffect(() => {

    if (purchasePrice && sellingPrice) {

      const profit =
        (
          ((Number(sellingPrice) - Number(purchasePrice))
          /
          Number(purchasePrice))
          *
          100
        ).toFixed(2);


      setValue(
        "profitPercent",
        profit
      );

    }

  }, [
    purchasePrice,
    sellingPrice,
    setValue
  ]);





  async function loadProduct() {

    const product =
      await getProductById(id);



    if(product){

      reset({

        name: product.name || "",

        image: product.image || "",

        brand: product.brand || "",

        category: product.category || "",

        unit: product.unit || "Piece",

        purchasePrice:
          product.purchasePrice || "",

        sellingPrice:
          product.sellingPrice || "",

        profitPercent:
          product.profitPercent || "",

        stock:
          product.stock || "",

        minimumStock:
          product.minimumStock || "",

        description:
          product.description || "",

        available:
          product.available ?? true,

      });

    }


    setLoading(false);

  }







  async function onSubmit(data){

    const result =
      await updateProduct(
        id,
        data
      );



    if(result.success){

      alert(result.message);

      navigate("/products");

    }
    else{

      alert(result.message);

    }

  }






  if(loading){

    return (

      <div className="
        text-center
        mt-20
        text-lg
      ">

        Loading Product...

      </div>

    );

  }







  return (

    <div>


      <PageHeader

        title="Edit Product"

        subtitle="Update inventory details"

      />




      <form

        onSubmit={
          handleSubmit(onSubmit)
        }

        className="
          bg-white
          rounded-xl
          shadow-md
          p-8
          space-y-5
        "

      >




        <div>

          <label className="font-medium">
            Product Image URL
          </label>

          <input

            {...register("image")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

            placeholder="Enter image URL"

          />

        </div>





        <div>

          <label className="font-medium">
            Product Name
          </label>


          <input

            {...register("name")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          />

        </div>





        <div>

          <label className="font-medium">
            Brand
          </label>


          <input

            {...register("brand")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          />

        </div>





        <div>

          <label className="font-medium">
            Category
          </label>


          <select

            {...register("category")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          >

            {
              categories.map((category)=>(

                <option
                  key={category}
                  value={category}
                >

                  {category}

                </option>

              ))
            }


          </select>

        </div>





        <div>

          <label className="font-medium">
            Unit
          </label>


          <select

            {...register("unit")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          >

            <option value="Kg">
              Kg
            </option>

            <option value="Gram">
              Gram
            </option>

            <option value="Litre">
              Litre
            </option>

            <option value="Packet">
              Packet
            </option>

            <option value="Piece">
              Piece
            </option>


          </select>

        </div>





        <div className="
          grid
          md:grid-cols-2
          gap-5
        ">


          <div>

            <label className="font-medium">
              Purchase Price
            </label>


            <input

              {...register("purchasePrice")}

              type="number"

              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
              "

            />


          </div>





          <div>

            <label className="font-medium">
              Selling Price
            </label>


            <input

              {...register("sellingPrice")}

              type="number"

              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
              "

            />


          </div>


        </div>





        <div>

          <label className="font-medium">
            Profit %
          </label>


          <input

            {...register("profitPercent")}

            readOnly

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
              bg-gray-100
            "

          />

        </div>





        <div className="
          grid
          md:grid-cols-2
          gap-5
        ">


          <div>

            <label className="font-medium">
              Current Stock
            </label>


            <input

              {...register("stock")}

              type="number"

              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
              "

            />

          </div>





          <div>

            <label className="font-medium">
              Minimum Stock Alert
            </label>


            <input

              {...register("minimumStock")}

              type="number"

              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
              "

            />

          </div>


        </div>





        <div>

          <label className="font-medium">
            Description
          </label>


          <textarea

            {...register("description")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

            rows="4"

          />


        </div>





        <div className="flex items-center gap-3">


          <input

            type="checkbox"

            {...register("available")}

          />


          <label>
            Available
          </label>


        </div>





        <div className="
          flex
          gap-4
          pt-4
        ">


          <button

            type="submit"

            className="
              bg-green-700
              hover:bg-green-800
              text-white
              px-6
              py-3
              rounded-lg
            "

          >

            Update Product

          </button>




          <button

            type="button"

            onClick={() =>
              navigate("/products")
            }

            className="
              bg-gray-500
              hover:bg-gray-600
              text-white
              px-6
              py-3
              rounded-lg
            "

          >

            Cancel

          </button>


        </div>




      </form>


    </div>

  );

}


export default EditProduct;