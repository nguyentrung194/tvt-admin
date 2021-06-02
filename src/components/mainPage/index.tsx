import React, { useRef, useState } from "react";
import { Header } from "../header";
import { MainHome } from "./main-home";
import { ListProducts } from "./cards";

export const Home = () => {
  return (
    <>
      <MainHome />
      <ListProducts />
    </>
  );
};
