import PropTypes from 'prop-types';

function CardProduct({ product }) {
  return (
    <div data-testid={ `customer_products__element-card-price-${id}` } key={ product.id }>

      <p>
        {product.name}
      </p>

      <img src={ product.urlImage } alt={ product.name } />

      <p>{ product.price }</p>

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
