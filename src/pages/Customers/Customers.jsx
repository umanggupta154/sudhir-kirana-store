import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";

import PageHeader from "../../components/Common/PageHeader";

import {
  getCustomers,
  deleteCustomer,
} from "../../services/customerService";


function Customers() {


  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");




  useEffect(() => {

    loadCustomers();

  }, []);





  async function loadCustomers() {

    setLoading(true);

    const data = await getCustomers();

    setCustomers(data);

    setLoading(false);

  }






  async function handleDelete(id) {


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this customer?"
      );


    if(!confirmDelete) return;



    const result =
      await deleteCustomer(id);



    if(result.success){

      alert(result.message);

      loadCustomers();

    }
    else{

      alert(result.message);

    }


  }







  const filteredCustomers =
    customers.filter((customer)=>{


      const keyword =
        search.toLowerCase();



      return (

        customer.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        customer.phone
          ?.includes(keyword)

        ||

        customer.email
          ?.toLowerCase()
          .includes(keyword)

      );


    });








  return (

    <div>


      <PageHeader

        title="Customers"

        subtitle="Manage store customers and ordering access"

      />







      {/* TOP BAR */}


      <div className="
        flex
        flex-col
        md:flex-row
        justify-between
        gap-4
        mb-6
      ">


        <div className="
          relative
          w-full
          md:w-96
        ">


          <Search

            size={18}

            className="
              absolute
              left-3
              top-3.5
              text-gray-400
            "

          />



          <input

            type="text"

            placeholder="Search customer..."

            value={search}

            onChange={
              (e)=>setSearch(e.target.value)
            }

            className="
              w-full
              border
              rounded-lg
              py-3
              pl-10
              pr-4
              focus:outline-none
              focus:ring-2
              focus:ring-green-600
            "

          />


        </div>







        <Link

          to="/add-customer"

          className="
            bg-green-700
            hover:bg-green-800
            text-white
            px-6
            py-3
            rounded-lg
          "

        >

          + Add Customer

        </Link>



      </div>









      {/* CUSTOMER TABLE */}



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
                Customer
              </th>


              <th className="text-left p-4">
                Phone
              </th>


              <th className="text-left p-4">
                Type
              </th>


              <th className="text-left p-4">
                Order Access
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
                  colSpan="6"
                  className="
                    text-center
                    p-8
                    text-gray-500
                  "
                >

                  Loading Customers...

                </td>


              </tr>



            )



            : filteredCustomers.length === 0 ? (


              <tr>


                <td

                  colSpan="6"

                  className="
                    text-center
                    p-8
                    text-gray-500
                  "

                >

                  No Customers Found

                </td>


              </tr>



            )



            : filteredCustomers.map((customer)=>(



              <tr

                key={customer.id}

                className="
                  border-t
                  hover:bg-gray-50
                "

              >






                <td className="p-4">


                  <div>


                    <p className="
                      font-semibold
                    ">

                      {customer.name}

                    </p>


                    <p className="
                      text-sm
                      text-gray-500
                    ">

                      {customer.email || "-"}

                    </p>


                  </div>


                </td>







                <td className="p-4">

                  {customer.phone}

                </td>







                <td className="p-4">


                  <span className="
                    bg-blue-100
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                  ">

                    {customer.customerType || "Retail"}

                  </span>


                </td>








                <td className="p-4">


                  {
                    customer.canOrder ?


                    <span className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    ">

                      Allowed

                    </span>



                    :



                    <span className="
                      bg-gray-100
                      text-gray-600
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    ">

                      Disabled

                    </span>

                  }


                </td>








                <td className="p-4">


                  {
                    customer.status === "active" ?


                    <span className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    ">

                      Active

                    </span>



                    :


                    <span className="
                      bg-red-100
                      text-red-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    ">

                      Blocked

                    </span>


                  }


                </td>







                <td className="p-4">


                  <div className="
                    flex
                    justify-center
                    gap-4
                  ">


                    <Link

                      to={`/edit-customer/${customer.id}`}

                      className="
                        text-blue-600
                      "

                    >

                      <Pencil size={18}/>

                    </Link>





                    <button

                      onClick={()=>
                        handleDelete(customer.id)
                      }

                      className="
                        text-red-600
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


export default Customers;