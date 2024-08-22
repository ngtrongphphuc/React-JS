import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "./ClientHeader";
import ClientFooter from "./ClientFooter";

const ClientLayout = () => {
  return (
    <>
      <ClientHeader />

      <main>
        <Outlet />
      </main>

      <ClientFooter />
    </>
  );
};

export default ClientLayout;
