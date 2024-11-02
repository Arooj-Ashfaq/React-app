import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const productData = collection(db, "products");
  
  // schema
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handle(data) {
    await addDoc(productData, data);
    alert("New product created");
    navigate("/myProducts");
  }

  return (
    <>
      <br/><br/><br/>
      <h1 className="newProducts-heading">Add new Products</h1>

      <div className="newProducts">
        <form onSubmit={handleSubmit(handle)}>
          <div className="newInp">
            <label>Enter Title: </label>
            <input type="text" className="newProductInput" {...register("title")} />
            <p style={{ color: "red" }}>{errors.title?.message}</p>

            <label>Enter Description: </label>
            <input type="text" className="newProductInput" {...register("description")} />
            <p style={{ color: "red" }}>{errors.description?.message}</p>

            <br/>
          </div>
          <input type="submit" className="submit-btn"/>
        </form>
      </div>
    </>
  );
}

export default Products;
