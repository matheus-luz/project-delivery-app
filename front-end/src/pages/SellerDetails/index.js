import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import OrderDetails from '../../components/OrderDetails';

function SellerDetails() {
  return (
    <>
      <Header>
        <HeaderButton
          to="/seller/orders"
          label="PEDIDOS"
          testid="customer_products__element-navbar-link-orders"
        />
      </Header>
      <OrderDetails userRole="seller" />
    </>
  );
}

export default SellerDetails;
