import React from "react";
import { Box } from "../components/box";
import { VStack } from "../components/vstack";
import { Image } from "../components/image";
import { Center } from "../components/center";
import { Text } from "../components/text";
import { Button,ButtonText } from "../components/button";
// import CustomReactLink from "../custom/CustomReactLink";
import LogoWebLight from "../assets/images/gluestackUiProLogo_web_light.svg";
import LogoMobile from "../assets/images/gluestackUiProLogo_mobile.png";
import GuestLayout from "../layouts/GuestLayout";

// to render login and sign up buttons
// function ActionButtons() {
//   return (
//     <VStack space="xs" className="mt-10 md:mt-12">
//       <Button
//         className="hover:bg-background-100 hover:text-primary-500 bg-background-0 dark:bg-background-950"
//         size="md"
//         variant="solid"
//         action="primary"
//         isDisabled={false}
//         isFocusVisible={false}
//       >
//         {/* <CustomReactLink
//           to="/login"
//           style={{
//             textDecoration: "none",
//           }}
//         > */}
//         <Text className="font-bold decoration-0 text-primary-500 dark:text-background-100">
//           LOGIN
//         </Text>
//         {/* </CustomReactLink> */}
//       </Button>

//       <Button
//         className="hover:bg-background-0 hover:text-primary-500 border-primary-0 my-4"
//         size="md"
//         variant="outline"
//         action="primary"
//         isDisabled={false}
//         isFocusVisible={false}
//       >
//         {/* <CustomReactLink
//           to="/signup"
//           style={{
//             textDecoration: "none",
//           }}
//         > */}
//         <ButtonText className="decoration-0 text-typography-100 dark:text-typography-900">
//           SIGN UP
//         </ButtonText>
//         {/* </CustomReactLink> */}
//       </Button>
//     </VStack>
//   );
// }

function HeaderLogo() {
  return (
    <Box className="items-center justify-center">
      <Image
        className="md:flex hidden h-141 w-275 object-contain"
        alt="gluestack-ui Pro"
        
        source={LogoWebLight}
      />
      <Image
        className="flex md:hidden h-40 w-80"
        alt="gluestack-ui Pro"
        source={LogoMobile}
      />
    </Box>
  );
}

export default function SplashScreen() {
  return (
    // place GluestackUIProvider in your app root accordingly
    <GuestLayout>
    <Center className="flex-1 w-full">
      <Box className="w-full  md:px-8  px-4 justify-center py-2 max-w-508">
        <HeaderLogo />
        {/* <Button
        // className="hover:bg-background-100 hover:text-primary-500 bg-background-0 dark:bg-background-950"
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      > TEST</Button> */}
        {/* <ActionButtons /> */}
      </Box>
    </Center>
    </GuestLayout>
  );
}
