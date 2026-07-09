import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import PageHeader from "../../components/Common/PageHeader";

import {
  addCustomer,
} from "../../services/customerService";

import {
  getCustomers,
  deleteCustomer,
} from "../../services/customerService";


function AddCustomer() {


  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
  } = useForm();





  async function onSubmit(data) {


    const result =
      await addCustomer(data);



    if(result.success){

      alert(result.message);

      reset();

      navigate("/customers");

    }
    else{

      alert(result.message);

    }


  }







  return (

    <div>


      <PageHeader

        title="Add Customer"

        subtitle="Create a new customer account"

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






        {/* Name */}


        <div>


          <label className="
            font-medium
          ">

            Customer Name

          </label>


          <input

            {...register("name")}

            type="text"

            placeholder="Enter customer name"

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          />


        </div>








        {/* Phone */}


        <div>


          <label className="
            font-medium
          ">

            Mobile Number

          </label>


          <input

            {...register("phone")}

            type="tel"

            placeholder="Enter mobile number"

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          />


        </div>








        {/* Email */}


        <div>


          <label className="
            font-medium
          ">

            Email

          </label>


          <input

            {...register("email")}

            type="email"

            placeholder="Enter email address"

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          />


        </div>








        {/* Address */}


        <div>


          <label className="
            font-medium
          ">

            Address

          </label>



          <textarea

            {...register("address")}

            rows="3"

            placeholder="Enter customer address"

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          />


        </div>








        {/* Customer Type */}


        <div>


          <label className="
            font-medium
          ">

            Customer Type

          </label>



          <select

            {...register("customerType")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          >


            <option value="Retail">
              Retail Customer
            </option>


            <option value="Wholesale">
              Wholesale Customer
            </option>


          </select>


        </div>








        {/* Order Permission */}


        <div className="
          flex
          items-center
          gap-3
        ">


          <input

            type="checkbox"

            {...register("canOrder")}

          />


          <label>

            Allow Online Ordering

          </label>


        </div>








        {/* Status */}


        <div>


          <label className="
            font-medium
          ">

            Customer Status

          </label>



          <select

            {...register("status")}

            className="
              w-full
              border
              rounded-lg
              p-3
              mt-2
            "

          >


            <option value="active">
              Active
            </option>


            <option value="blocked">
              Blocked
            </option>


          </select>


        </div>








        {/* Buttons */}


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

            Save Customer

          </button>





          <button

            type="button"

            onClick={() =>
              navigate("/customers")
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


export default AddCustomer;