import React from "react";
import { connect } from "react-redux";
import { Box, Text } from "@gluestack-ui/themed";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Box
          position="absolute"
          top={-10}
          right={-10}
          bg="$red600"
          borderRadius={9999}
          px="$2"
          py="$1"
          minWidth={24}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="$xs" fontWeight="bold" color="$white">
            {props.cartItems.length}
          </Text>
        </Box>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItemsFromRedux,
  };
};

export default connect(mapStateToProps)(CartIcon);

/*
position="absolute": This means we’re placing the badge on top of something else — like the cart icon. It’s not in the normal flow of layout; it’s floating.

top={-10}, right={-10}: This moves the badge 10 units up and 10 units to the left of the corner. The -10 values help it overlap the cart icon slightly — placing it at the top-right.

borderRadius 9999: It's a shortcut to force a circle, regardless of the box size. It guarantees the corners are fully rounded, even if the box is resized.

px = padding left + right, py = padding top + bottom

fontSize="$xs" sets the font size to extra small. $2xs
Very very small

*/
