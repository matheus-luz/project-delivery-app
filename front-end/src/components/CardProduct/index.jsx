import PropTypes from 'prop-types';
import Counter from '../Counter';

function CardProduct({ product }) {
  return (
    <div
      className={ ` 
        ring-gray-400
        ring-1 
        ring-inset 
        shadow-md
        flex
        flex-col
        justify-center
        items-center
        relative` }
      data-testid={ `customer_products__element-card-price-${product.id}` }
      key={ product.id }
    >

      <p
        className="text-center absolute top-0 left-0 text-xl font-bold p-2 drop-shadow-sm"
        data-testid={ `customer_products__element-card-price-${product.id}` }
      >
        { product.price.replace(/\./, ',') }
      </p>
      <img
        className="object-contain h-52 p-2 object-center"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ product.urlImage }
        alt={ product.name }
      />
      <div className="flex flex-col justify-between items-center bg-slate-300 p-2 gap-3">
        <p
          className="text-center text-md font-bold text-gray-800"
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          {product.name}
        </p>

        <Counter
          product={ product }
        />
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProduct;
