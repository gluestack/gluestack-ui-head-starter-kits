import React from "react";
import {
  Box,
  VStack,
  Button,
  Image,
  Center,
  ButtonText,
} from "@gluestack-ui/themed";

import CustomReactLink from "../custom/CustomReactLink";
import LogoWebLight from "../assets/images/gluestackUiProLogo_web_light.svg";
import LogoMobile from "../assets/images/gluestackUiProLogo_mobile.png";

import GuestLayout from "../layouts/GuestLayout";

// to render login and sign up buttons
function ActionButtons() {
  return (
    <VStack
      space="xs"
      mt="$10"
      sx={{
        "@md": {
          mt: "$12",
        },
      }}
    >
      <Button
        sx={{
          ":hover": {
            bg: "$backgroundLight100",
          },
        }}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        backgroundColor="$backgroundLight0"
      >
        <CustomReactLink
          to="/login"
          style={{
            textDecoration: "none",
          }}
        >
          <ButtonText
            fontWeight="$bold"
            textDecorationLine="none"
            color="$primary500"
          >
            LOGIN
          </ButtonText>
        </CustomReactLink>
      </Button>

      <Button
        sx={{
          ":hover": {
            bg: "$backgroundLight0",
            _text: {
              color: "$primary500",
            },
          },
        }}
        my="$4"
        size="md"
        variant="outline"
        borderColor="$borderLight0"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      >
        <CustomReactLink
          to="/signup"
          style={{
            textDecoration: "none",
          }}
        >
          <ButtonText textDecorationLine="none" color="$textLight50">
            SIGN UP
          </ButtonText>
        </CustomReactLink>
      </Button>
    </VStack>
  );
}

function HeaderLogo() {
  return (
    <Box alignItems="center" justifyContent="center">
      <Image
        h="$10"
        w="$80"
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={LogoWebLight}
        sx={{
          "@md": {
            display: "flex",
          },
        }}
        display="none"
      />

      <Image
        sx={{
          "@md": {
            display: "none",
          },
        }}
        alt="gluestack-ui Pro"
        display="flex"
        source={LogoMobile}
        w="$275"
        h="$141"
      />
    </Box>
  );
}

export default function SplashScreen() {
  return (
    // place GluestackUIProvider in your app root accordingly
    <GuestLayout>
      <Center w="$full" flex={1}>
        <Box
          maxWidth="$508"
          w="$full"
          minHeight="$authcard"
          sx={{
            "@md": {
              px: "$8",
              bg: "$primary500",
            },
          }}
          px="$4"
          justifyContent="center"
        >
          <HeaderLogo />
          <ActionButtons />
        </Box>
      </Center>
    </GuestLayout>
  );
}
