import React, { useState } from "react";
import { Image as RNImage } from "react-native";
import {
  Box,
  Text,
  Heading,
  VStack,
  Center,
  HStack,
  Image,
  Button,
  ButtonText,
  ScrollView,
} from "@gluestack-ui/themed";

const CartItem = (props) => {
  const data = props.item;
  const product = data.product;
  console.log(product);
  return (
    <HStack
      bg="white"
      p="$3"
      my="$.2"
      borderBottomWidth={1}
      borderBottomColor="$trueGray300"
      alignItems="center"
      space="md"
    >
      <Image
        source={{
          uri: product.image
            ? product.image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
        alt="product"
        width={60}
        height={60}
      />
      <Text fontWeight="bold">{product.name}</Text>
      <Box flex={1} />
      <Text color="$textLight900">${product.price}</Text>
    </HStack>
  );
};

export default CartItem;
