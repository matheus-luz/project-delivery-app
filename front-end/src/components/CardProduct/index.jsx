import PropTypes from 'prop-types';
import Counter from '../Counter';

function CardProduct({ product }) {
  return (
    <div
      data-testid={ `customer_products__element-card-price-${product.id}` }
      key={ product.id }
    >

      <p data-testid={ `customer_products__element-card-title-${product.id}` }>
        {product.name}
      </p>

      <img
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ product.urlImage }
        alt={ product.name }
      />

      <p data-testid={ `customer_products__element-card-price-${product.id}` }>
        { product.price }
      </p>
      <Counter product={ product } />
    </div>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProduct;
