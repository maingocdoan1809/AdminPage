import { EAdminPage } from "../../utilities/utils";
import Products from "../../components/AdminComponents/Product/Products/Product";
import Categories from "../../components/AdminComponents/Category/Categories/Categories";
import Layout from "../../layouts/AdminLayout/Layout";
import { useAdminPageContext } from "../../contexts/AdminPageContext/AdminPageContext";
import Profile from "../../components/Profile/Profile";
import Orders from "../../components/AdminComponents/Order/Orders/Orders";
import Auth from "../../components/AdminComponents/Auth/Auth";

function AdminPage() {
  const [page, setPage] = useAdminPageContext();
  return (
    <Auth>
      <Layout>
        {page == EAdminPage.PRODUCT && <Products />}
        {page == EAdminPage.PROFILE && <Profile />}
        {page == EAdminPage.ORDER && <Orders />}
        {page == EAdminPage.CATEGORY && <Categories />}
      </Layout>
    </Auth>
  );
}

export default AdminPage;
