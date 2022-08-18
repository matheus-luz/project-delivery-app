import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import OrderDetails from '../../components/OrderDetails';

function CustomerDetails() {
  return (
    <>
      <Header>
        <HeaderButton
          to="/customer/products"
          label="PRODUTOS"
          testid="customer_products__element-navbar-link-products"
        />
        <HeaderButton
          to="/customer/orders"
          label="MEUS PEDIDOS"
          testid="customer_products__element-navbar-link-orders"
        />
      </Header>
      <OrderDetails userRole="customer" />
    </>
  );
}

export default CustomerDetails;
