import React, { useEffect } from "react";
import TopBar from "./TopBar";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminProducts } from "../Actions/product";
import { getAllUsers } from "../Actions/user";
import { getAllOrders } from "../Actions/order";
import MetaData from "../MetaData";

const Dashboard = () => {
  
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((state) => state.products);
  const { allOrders, totalAmount, allUsers } = useSelector(
    (state) => state.adminOrder
  );

  useEffect(() => {
    dispatch(getAllAdminProducts());
    dispatch(getAllUsers());
     dispatch(getAllOrders());
  }, [dispatch]);
  
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["black"],
        hoverBackgroundColor: ["rgb(115, 147, 179)"],
        data: [0, totalAmount],
      },
    ],
  };

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <TopBar />
      <div className="flex flex-row flex-wrap space-x-5 mx-1 justify-center items-center">
        <div className="mb-4 px-2 py-5 md:px-5 md:py-14 rounded-full bg-green-50 text-sm md:text-lg ">
          <p className="text-center md:text-base text-[10px]">TOTAL AMOUNT</p>
          <p className="font-bold  md:text-base text-[13px] text-center">
            ₹{totalAmount}
          </p>
        </div>
        <div className="mb-4 px-5 py-5 md:px-9 md:py-14 rounded-full bg-yellow-50 text-sm md:text-lg ">
          <p className="md:text-base text-[10px]">PRODUCTS</p>
          <p className="font-bold  md:text-base text-[13px] text-center">
            {adminProducts?.length}
          </p>
        </div>
        <div className="mb-4 px-6 py-5 md:px-12 md:py-14 rounded-full bg-indigo-50 text-sm md:text-lg ">
          <p className="md:text-base text-[10px]">ORDERS</p>
          <p className="font-bold  md:text-base text-[13px] text-center">
            {allOrders?.length}
          </p>
        </div>
        <div className="mb-4 px-6 py-5  md:px-14 md:py-14 rounded-full bg-red-50 text-sm md:text-lg ">
          <p className="md:text-base text-[10px]">USERS</p>
          <p className="font-bold  md:text-base text-[13px] text-center">
            {allUsers?.length}
          </p>
        </div>
      </div>

      <div className="w-[80%] mx-auto sm:p-2 p-0">
        <Line data={lineState} />
      </div>
    </>
  );
};

export default Dashboard;
