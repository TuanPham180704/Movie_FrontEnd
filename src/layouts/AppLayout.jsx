import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-3 py-4">{children}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;
