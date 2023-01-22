import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  // CRIO_SOLUTION_START_MODULE_CART
  // FIXME - Add unit tests for each of these pure functions
  if (!cartData) return;

  const nextCart = cartData.map((item) => ({
    ...item,
    ...productsData.find((product) => item.productId === product._id),
  }));

  return nextCart;
  // CRIO_SOLUTION_END_MODULE_CART

//   if(productsData.length === 0) return [];
//   const cartItems = [];
// cartData.forEach(itemData=> {
//   const fullData = productsData.find(productData => productData._id ===itemData.productId);
//   cartItems.push({qty: itemData.qty, ...fullData});
//   });
//   return cartItems;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  // CRIO_SOLUTION_START_MODULE_CART
  if (!items.length) return 0;
  const total = items.filter(item=>item.qty)
    .map((item) => item.cost * item.qty)
    .reduce((total, n) => total + n);
  return total;
  // CRIO_SOLUTION_END_MODULE_CART
};

// CRIO_SOLUTION_AND_STUB_START_MODULE_CHECKOUT
// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  // CRIO_SOLUTION_START_MODULE_CHECKOUT
  if (!items.length) return 0;
  const total = items.map((item) => item.qty).reduce((total, n) => total + n);
  return total;
  // CRIO_SOLUTION_END_MODULE_CHECKOUT
};
// CRIO_SOLUTION_AND_STUB_END_MODULE_CHECKOUT

// TODO: CRIO_TASK_MODULE_CHECKOUT - Add static quantity view for Checkout page cart
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
// CRIO_SOLUTION_AND_STUB_START_MODULE_CHECKOUT
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
// CRIO_SOLUTION_AND_STUB_END_MODULE_CHECKOUT
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
  // CRIO_SOLUTION_START_MODULE_CHECKOUT
  isReadOnly,
  // CRIO_SOLUTION_END_MODULE_CHECKOUT
}) => {
  // CRIO_SOLUTION_START_MODULE_CHECKOUT
  if (isReadOnly) {
    return <Box>Qty: {value}</Box>;
  }
  // CRIO_SOLUTION_END_MODULE_CHECKOUT
  // CRIO_SOLUTION_AND_STUB_START_MODULE_CART
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
  // CRIO_SOLUTION_AND_STUB_END_MODULE_CART
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
// CRIO_SOLUTION_AND_STUB_START_MODULE_CHECKOUT
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
// CRIO_SOLUTION_AND_STUB_END_MODULE_CHECKOUT
 * 
 */
const Cart = ({
  products,
  items = [],
  handleQuantity,
  // CRIO_SOLUTION_START_MODULE_CART
  hasCheckoutButton = false,
  // CRIO_SOLUTION_END_MODULE_CART
  // CRIO_SOLUTION_START_MODULE_CHECKOUT
  isReadOnly = false,
  // CRIO_SOLUTION_END_MODULE_CHECKOUT
}) => {
  // CRIO_SOLUTION_START_MODULE_CART
  const token = localStorage.getItem("token");
  const history = useHistory();

  const routeToCheckout = () => {
    history.push("/checkout");
  };
  // CRIO_SOLUTION_END_MODULE_CART

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {/* CRIO_SOLUTION_START_MODULE_CART */}
        {items.map((item) => (
          <Box key={item.productId}>
            {item.qty > 0 ? (
              <Box display="flex" alignItems="flex-start" padding="1rem">
                <Box className="image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
                >
                  <div>{item.name}</div>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ItemQuantity
                      handleAdd={async () => {
                        await handleQuantity(
                          token,
                          items,
                          products,
                          item.productId,
                          item.qty + 1,
                        
                        );
                      }}
                      handleDelete={async () => {
                        await handleQuantity(
                          token,
                          items,
                          products,
                          item.productId,
                          item.qty - 1,
                        
                        );
                      }}
                      value={item.qty}
                      // CRIO_SOLUTION_START_MODULE_CHECKOUT
                      isReadOnly={isReadOnly}
                      // CRIO_SOLUTION_END_MODULE_CHECKOUT
                    />
                    <Box padding="0.5rem" fontWeight="700">
                      ${item.cost}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        ))}
        {/* CRIO_SOLUTION_END_MODULE_CART */}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        {/* {/* CRIO_UNCOMMENT_START_MODULE_CART */}
        {/* <Box display="flex" justifyContent="flex-end" className="cart-footer">
         <Button
           color="primary"
           variant="contained"
           startIcon={<ShoppingCart />}
           className="checkout-btn"
         >
           Checkout
         </Button>
        </Box> */}
        {/* CRIO_UNCOMMENT_END_MODULE_CART */}
        {/* {/* CRIO_UNCOMMENT_START_MODULE_CHECKOUT */}
        {/* <Box display="flex" justifyContent="flex-end" className="cart-footer">
         <Button
           color="primary"
           variant="contained"
           startIcon={<ShoppingCart />}
           className="checkout-btn"
         >
           Checkout
         </Button>
        </Box> */}
        {/* CRIO_UNCOMMENT_END_MODULE_CHECKOUT*/}
        {/* CRIO_SOLUTION_START_MODULE_CART */}
        {hasCheckoutButton && (
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={routeToCheckout}
            >
              Checkout
            </Button>
          </Box>
        )}
        {/* CRIO_SOLUTION_END_MODULE_CART */}
      </Box>
      {/* CRIO_SOLUTION_START_MODULE_CHECKOUT */}
      {isReadOnly && (
        <Box className="cart" padding="1rem">
          <h2>Order Details</h2>
          <Box className="cart-row">
            <p>Products</p>
            <p>{getTotalItems(items)}</p>
          </Box>
          <Box className="cart-row">
            <p>Subtotal</p>
            <p>${getTotalCartValue(items)}</p>
          </Box>
          <Box className="cart-row">
            <p>Shipping Charges</p>
            <p>$0</p>
          </Box>
          <Box className="cart-row" fontSize="1.25rem" fontWeight="700">
            <p>Total</p>
            <p>${getTotalCartValue(items)}</p>
          </Box>
        </Box>
      )}
      {/* CRIO_SOLUTION_END_MODULE_CHECKOUT */}
    </>
  );
};

export default Cart;
