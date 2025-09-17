\* Notes: Screens -> Cart -> Cart.js
Box flex={1} -> This is the Container for the entire Cart screen. It ensures the screen takes up full available space(flex={1}). This wrapper stays the same whether the cart has items or is empty.

2nd Box flex= {1} -> This is only rendered if the cart has items.

HStack = Horizontal Stack. It lays out children side by side (left → right) instead of top to bottom.
borderRadius="$md" Rounds the corners of the box. $md = medium roundness from theme.
space="md" Adds horizontal spacing between child elements. So the image, text, and price don’t stick together—they have breathing room.

That empty <Box flex={1} /> is the spacer. flex={1} means: This Box takes up all available extra horizontal space inside the row. What happens in practice: The spacer pushes everything after it (the price) as far right as possible. Without this spacer, the price would sit immediately after the product name.
\*/

/\* Store.js
Notes:
createStore → builds the store (the big data box).
combineReducers → if we have multiple reducers (cart, user, products), we combine them into one.
applyMiddleware → allows extra tools (like async actions) to work with Redux.

Thunk is a helper that lets us write async code in Redux (like fetching products from an API).
rootReducer (all the rules for updating state).
applyMiddleware(thunk) (so async actions are allowed).
\*/
