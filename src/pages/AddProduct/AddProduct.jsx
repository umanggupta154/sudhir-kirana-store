import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import PageHeader from "../../components/Common/PageHeader";
import categories from "../../utils/categories";
import { addProduct } from "../../services/productService";


function AddProduct() {

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({

    defaultValues: {
      available: true,
      unit: "Kg",
    }

  });



  const purchasePrice = useWatch({
    control,
    name: "purchasePrice"
  });


  const sellingPrice = useWatch({
    control,
    name: "sellingPrice"
  });



  const profitPercent =
    purchasePrice && sellingPrice
      ? (
          ((sellingPrice - purchasePrice) / purchasePrice) * 100
        ).toFixed(2)
      : 0;





  const handleImageChange = (e)=>{

    const file = e.target.files[0];

    if(file){

      setImagePreview(
        URL.createObjectURL(file)
      );

    }

  };






  const onSubmit = async(data)=>{


    try{

      setLoading(true);


      const productData = {

        ...data,

        profitPercent: Number(profitPercent),

        purchasePrice:
          Number(data.purchasePrice),

        sellingPrice:
          Number(data.sellingPrice),

        stock:
          Number(data.stock),

        minimumStock:
          Number(data.minimumStock),

        image:imagePreview

      };



      const result = await addProduct(productData);



      if(result.success){

        alert(result.message);

        reset();

        setImagePreview(null);

      }
      else{

        alert(result.message);

      }


    }
    catch(error){

      alert("Something went wrong");

    }
    finally{

      setLoading(false);

    }

  };





  return (

    <div>


      <PageHeader

        title="Add Product"

        subtitle="Create a new inventory product"

      />




      <form

        onSubmit={
          handleSubmit(onSubmit)
        }

        className="space-y-6"

      >




        {/* IMAGE CARD */}


        <div className="bg-white rounded-xl shadow-md p-6">


          <h2 className="text-lg font-semibold mb-4">
            Product Image
          </h2>



          <div className="flex items-center gap-6">


            {

              imagePreview ? (

                <img

                  src={imagePreview}

                  className="w-32 h-32 object-cover rounded-xl border"

                />

              ):(

                <div className="w-32 h-32 rounded-xl border flex items-center justify-center text-gray-400">

                  No Image

                </div>

              )

            }



            <label className="cursor-pointer bg-gray-100 px-5 py-3 rounded-lg hover:bg-gray-200">

              Upload Image


              <input

                type="file"

                accept="image/*"

                hidden

                onChange={handleImageChange}

              />

            </label>



          </div>


        </div>







        {/* BASIC INFORMATION */}



        <div className="bg-white rounded-xl shadow-md p-6">


          <h2 className="text-lg font-semibold mb-5">

            Basic Information

          </h2>



          <div className="grid md:grid-cols-2 gap-5">


            <div>

              <label>
                Product Name
              </label>

              <input

                {...register("name",{
                  required:true
                })}

                className="input-style"

                placeholder="Enter product name"

              />

            </div>





            <div>

              <label>
                Brand
              </label>


              <input

                {...register("brand")}

                className="input-style"

                placeholder="Enter brand name"

              />

            </div>






            <div>

              <label>
                Category
              </label>


              <select

                {...register("category",{
                  required:true
                })}

                className="input-style"

              >

                <option value="">
                  Select Category
                </option>


                {
                  categories.map((cat)=>(

                    <option
                      key={cat}
                      value={cat}
                    >

                      {cat}

                    </option>

                  ))
                }


              </select>


            </div>







            <div>

              <label>
                Unit
              </label>


              <select

                {...register("unit")}

                className="input-style"

              >

                <option>Kg</option>

                <option>Gram</option>

                <option>Litre</option>

                <option>Packet</option>

                <option>Piece</option>


              </select>


            </div>


          </div>


        </div>








        {/* PRICING */}





        <div className="bg-white rounded-xl shadow-md p-6">


          <h2 className="text-lg font-semibold mb-5">

            Pricing

          </h2>




          <div className="grid md:grid-cols-3 gap-5">



            <div>

              <label>
                Purchase Price
              </label>


              <input

                type="number"

                {...register("purchasePrice",{
                  required:true
                })}

                className="input-style"

                placeholder="₹"

              />


            </div>







            <div>

              <label>
                Selling Price
              </label>


              <input

                type="number"

                {...register("sellingPrice",{
                  required:true
                })}

                className="input-style"

                placeholder="₹"

              />


            </div>







            <div>

              <label>
                Profit %
              </label>


              <input

                value={profitPercent}

                readOnly

                className="input-style bg-gray-100"

              />


            </div>


          </div>



        </div>








        {/* INVENTORY */}



        <div className="bg-white rounded-xl shadow-md p-6">


          <h2 className="text-lg font-semibold mb-5">

            Inventory

          </h2>




          <div className="grid md:grid-cols-2 gap-5">



            <div>

              <label>
                Current Stock
              </label>


              <input

                type="number"

                {...register("stock",{
                  required:true
                })}


                className="input-style"

              />


            </div>






            <div>

              <label>
                Minimum Stock Alert
              </label>


              <input

                type="number"

                {...register("minimumStock")}

                className="input-style"

                placeholder="Alert when stock is low"

              />


            </div>



          </div>



        </div>








        {/* DESCRIPTION */}





        <div className="bg-white rounded-xl shadow-md p-6">


          <h2 className="text-lg font-semibold mb-4">

            Description

          </h2>


          <textarea

            {...register("description")}

            rows="4"

            className="input-style"

            placeholder="Write product details..."

          />


        </div>









        {/* AVAILABLE */}




        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-3">


          <input

            type="checkbox"

            {...register("available")}

            className="w-5 h-5"

          />


          <label>

            Product Available

          </label>


        </div>







        <button

          disabled={loading}

          className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl shadow"

        >

          {
            loading
            ? "Saving..."
            : "Save Product"
          }


        </button>




      </form>



    </div>

  );

}


export default AddProduct;