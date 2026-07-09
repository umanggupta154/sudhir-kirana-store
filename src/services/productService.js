import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";


// =============================
// Add Product
// =============================
export async function addProduct(product) {
  try {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Product added successfully",
    };

  } catch (error) {
    console.error("Add Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}




// =============================
// Get All Products
// =============================
export async function getProducts() {
  try {
    const snapshot = await getDocs(
      collection(db, "products")
    );

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

  } catch (error) {
    console.error("Get Products Error:", error);

    return [];
  }
}




// =============================
// Get Single Product
// =============================
export async function getProductById(id) {
  try {
    const productRef = doc(db, "products", id);

    const snapshot = await getDoc(productRef);

    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    }

    return null;

  } catch (error) {
    console.error("Get Product Error:", error);

    return null;
  }
}




// =============================
// Update Product
// =============================
export async function updateProduct(id, product) {
  try {
    await updateDoc(
      doc(db, "products", id),
      {
        ...product,
        updatedAt: serverTimestamp(),
      }
    );

    return {
      success: true,
      message: "Product updated successfully",
    };

  } catch (error) {
    console.error("Update Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}




// =============================
// Delete Product
// =============================
export async function deleteProduct(id) {
  try {
    await deleteDoc(
      doc(db, "products", id)
    );

    return {
      success: true,
      message: "Product deleted successfully",
    };

  } catch (error) {
    console.error("Delete Product Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}




// =============================
// Dashboard Statistics
// =============================
export async function getDashboardStats() {
  try {
    const snapshot = await getDocs(
      collection(db, "products")
    );


    const products = snapshot.docs.map(
      (document) => ({
        id: document.id,
        ...document.data(),
      })
    );



    const lowStockProducts = products.filter(
      (product) =>
        Number(product.stock) <=
        Number(product.minimumStock || 0)
    );



    return {

      // Total Products
      totalProducts: products.length,


      // Available Products
      availableProducts:
        products.filter(
          (product) => product.available
        ).length,


      // Out Of Stock
      outOfStock:
        products.filter(
          (product) =>
            Number(product.stock) <= 0
        ).length,


      // Low Stock Count
      lowStock:
        lowStockProducts.length,


      // Low Stock List
      lowStockProducts,


    };


  } catch (error) {

    console.error(
      "Dashboard Stats Error:",
      error
    );


    return {

      totalProducts: 0,

      availableProducts: 0,

      outOfStock: 0,

      lowStock: 0,

      lowStockProducts: [],

    };
  }
}