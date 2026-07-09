import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/Common/PageHeader";
import StatCard from "../../components/Dashboard/StatCard";

import { getDashboardStats } from "../../services/productService";


function Dashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    lowStockProducts: [],
  });


  useEffect(() => {
    loadStats();
  }, []);


  async function loadStats() {
    const data = await getDashboardStats();
    setStats(data);
  }


  return (
    <div>


      <PageHeader
        title="Dashboard"
        subtitle="Inventory overview and business insights"
      />



      {/* Statistics */}

      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-4 
        gap-6
      ">


        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          color="#16A34A"
        />


        <StatCard
          title="Available Products"
          value={stats.availableProducts}
          color="#2563EB"
        />


        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          color="#F97316"
        />


        <StatCard
          title="Out Of Stock"
          value={stats.outOfStock}
          color="#DC2626"
        />


      </div>





      {/* Low Stock Alert */}

      <div className="
        bg-white
        rounded-xl
        shadow-md
        mt-8
        p-6
      ">


        <h2 className="
          text-xl
          font-semibold
          mb-5
        ">
          ⚠ Low Stock Alert
        </h2>



        {
          stats.lowStockProducts.length === 0 ? (

            <p className="text-gray-500">
              All products have sufficient stock.
            </p>

          ) : (


            <div className="space-y-4">


              {
                stats.lowStockProducts.map((product) => (

                  <div
                    key={product.id}
                    className="
                      flex
                      justify-between
                      items-center
                      border-b
                      pb-3
                    "
                  >


                    <div>

                      <p className="font-semibold">
                        {product.name}
                      </p>


                      <p className="text-sm text-gray-500">
                        Minimum required: {product.minimumStock} {product.unit}
                      </p>

                    </div>



                    <span className="
                      bg-orange-100
                      text-orange-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    ">

                      {product.stock} {product.unit}

                    </span>


                  </div>


                ))
              }


            </div>


          )
        }


      </div>







      {/* Quick Actions */}

      <div className="
        bg-white
        rounded-xl
        shadow-md
        mt-6
        p-6
      ">


        <h2 className="
          text-xl
          font-semibold
          mb-4
        ">
          Quick Actions
        </h2>



        <div className="
          flex
          flex-wrap
          gap-4
        ">


          <Link
            to="/add-product"
            className="
              bg-green-700
              hover:bg-green-800
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            + Add Product
          </Link>



          <Link
            to="/products"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            View Products
          </Link>



          <Link
            to="/orders"
            className="
              bg-purple-600
              hover:bg-purple-700
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            View Orders
          </Link>


        </div>


      </div>



    </div>
  );
}


export default Dashboard;