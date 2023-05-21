import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import LoadingView from "../../components/LoadingView/LoadingView";
import { Product } from "../../utilities/utils";
import Layout from "../../layouts/CustomerLayout/Layout";
import SearchResult from "../../components/SearchResults/SearchResult";

interface SearchPageProps {
  products: Product[];
}

function SearchPage() {
  return (
    <Layout>
      <SearchResult />
    </Layout>
  );
}

export default SearchPage;