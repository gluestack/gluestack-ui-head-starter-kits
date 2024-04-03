import React from "react";
// import {
//   Box,
//   VStack,
//   Button,
//   Image,
//   Center,
//   ButtonText,
// } from "@gluestack-ui/themed";
import { Box } from "@/src/components/box";
import { VStack } from "@/src/components/vstack";
import { Image } from "@/src/components/image";
import { Center } from "@/src/components/center";
import { Button,ButtonText } from "@/src/components/button";


// import CustomReactLink from "../custom/CustomReactLink";
import LogoWebLight from "../assets/images/gluestackUiProLogo_web_light.svg";
import LogoMobile from "../assets/images/gluestackUiProLogo_mobile.png";

import GuestLayout from "../layouts/GuestLayout";

// to render login and sign up buttons
function ActionButtons() {
  return (
    <VStack space="xs" className="mt-10 md:mt-12">
      <Button
        className="hover:bg-background-100 hover:text-primary-500 bg-background-0 dark:bg-background-950"
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        // backgroundColor="$backgroundLight0"
      >
        {/* <CustomReactLink
          to="/login"
          style={{
            textDecoration: "none",
          }}
        > */}
        <ButtonText className="font-bold decoration-0 text-primary-500 dark:text-background-100">
          LOGIN
        </ButtonText>
        {/* </CustomReactLink> */}
      </Button>

      <Button
        className="hover:bg-background-0 hover:text-primary-500 border-primary-0 my-4"
        size="md"
        variant="outline"
        // borderColor="$borderLight0"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      >
        {/* <CustomReactLink
          to="/signup"
          style={{
            textDecoration: "none",
          }}
        > */}
        <ButtonText className="decoration-0 text-typography-100 dark:text-typography-900">
          SIGN UP
        </ButtonText>
        {/* </CustomReactLink> */}
      </Button>
    </VStack>
  );
}

function HeaderLogo() {
  return (
    <Box className="items-center justify-center">
      <Image
        className="md:hidden flex sm:h-[40px] sm:w-[320px] md:h-[141px] md:w-[275px]"
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={LogoWebLight}
      />

      <Image
        className="hidden md:flex sm:h-[40px] sm:w-[320px] md:h-[141px] md:w-[275px]"
        alt="gluestack-ui Pro"
        source={LogoMobile}
      />
    </Box>
  );
}

export default function SplashScreen() {
  return (
    // place GluestackUIProvider in your app root accordingly
    // <GuestLayout>
    <Center className="flex-1 w-full">
      <Box className="w-full min-h-[$authcard] md:px-8  px-4 justify-center py-2 max-w-[508px]">
        <HeaderLogo />
        <ActionButtons />
      </Box>
    </Center>
    // </GuestLayout>
  );
}
