import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
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
      updatedAt: serverTimestamp(),
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
    const snapshot = await getDocs(collection(db, "products"));

    const products = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return products;
  } catch (error) {
    console.error("Get Products Error:", error);
    return [];
  }
}

// =============================
// Delete Product
// =============================
export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, "products", id));

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
    const snapshot = await getDocs(collection(db, "products"));

    const products = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return {
      totalProducts: products.length,
      outOfStock: products.filter(
        (product) => !product.available
      ).length,
      totalStock: products.reduce(
        (total, product) =>
          total + Number(product.stock || 0),
        0
      ),
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return {
      totalProducts: 0,
      outOfStock: 0,
      totalStock: 0,
    };
  }
}