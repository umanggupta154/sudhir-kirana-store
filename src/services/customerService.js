import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";



// =============================
// Add Customer
// =============================
export async function addCustomer(customer) {

  try {

    await addDoc(
      collection(db, "customers"),
      {
        ...customer,

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      }
    );


    return {

      success: true,

      message:
        "Customer added successfully",

    };


  } catch(error) {


    console.error(
      "Add Customer Error:",
      error
    );


    return {

      success:false,

      message:error.message,

    };


  }

}






// =============================
// Get All Customers
// =============================
export async function getCustomers(){

  try{


    const snapshot =
      await getDocs(
        collection(db,"customers")
      );



    return snapshot.docs.map(
      (document)=>({

        id:document.id,

        ...document.data(),

      })
    );



  }
  catch(error){


    console.error(
      "Get Customers Error:",
      error
    );


    return [];


  }

}








// =============================
// Get Single Customer
// =============================
export async function getCustomerById(id){

  try{


    const customerRef =
      doc(db,"customers",id);



    const snapshot =
      await getDoc(customerRef);



    if(snapshot.exists()){


      return {

        id:snapshot.id,

        ...snapshot.data(),

      };


    }


    return null;



  }
  catch(error){


    console.error(
      "Get Customer Error:",
      error
    );


    return null;


  }

}








// =============================
// Update Customer
// =============================
export async function updateCustomer(
  id,
  customer
){

  try{


    await updateDoc(

      doc(db,"customers",id),

      {

        ...customer,

        updatedAt:
          serverTimestamp(),

      }

    );



    return {

      success:true,

      message:
        "Customer updated successfully",

    };



  }
  catch(error){


    console.error(
      "Update Customer Error:",
      error
    );



    return {

      success:false,

      message:error.message,

    };


  }

}








// =============================
// Delete Customer
// =============================
export async function deleteCustomer(id){

  try{


    await deleteDoc(

      doc(db,"customers",id)

    );



    return {

      success:true,

      message:
        "Customer deleted successfully",

    };



  }
  catch(error){


    console.error(
      "Delete Customer Error:",
      error
    );


    return {

      success:false,

      message:error.message,

    };


  }

}