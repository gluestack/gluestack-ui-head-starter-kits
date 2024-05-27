import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';
import GuestLayout from '../../layouts/GuestLayout';
import StyledExpoRouterLink from '../../app/components/StyledExpoRouterLink';

function ActionButtons() {
  return (
    <VStack className="space-xs mt-10 md:mt-12">
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        className="hover:bg-background-100 hover:text-typography-500 bg-background-0"
      >
        <StyledExpoRouterLink href="/login" width="auto">
          <ButtonText className="font-bold decoration-0 text-typography-900 dark:text-typography-0">
            LOGIN
          </ButtonText>
        </StyledExpoRouterLink>
      </Button>
      <Button
        className="hover:bg-background-0 hover:text-primary-500 border-primary-0 my-4"
        size="md"
        variant="outline"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      >
        <StyledExpoRouterLink href="/signup" width="auto">
          <ButtonText className="decoration-0 text-typography-100 dark:text-typography-900">
            SIGN UP
          </ButtonText>
        </StyledExpoRouterLink>
      </Button>
    </VStack>
  );
}

function HeaderLogo() {
  return (
    <Box className="items-center justify-center">
      <Image
        alt="gluestack-ui Pro"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        className="md:flex hidden h-141 w-275 object-contain"
      />
      <Image
        alt="gluestack-ui Pro"
        className="flex md:hidden h-40 w-80"
        source={require('./assets/images/gluestackUiProLogo_mobile.png')}
      />
    </Box>
  );
}


export default function SplashScreen() {
  return (
    <GuestLayout>
      <Center className="flex-1 w-full">
        <Box
          className="w-full max-w-508 min-h-authcard md:px-8  px-4 justify-center py-2"
        >
          <HeaderLogo />
          <ActionButtons />
        </Box>
      </Center>
    </GuestLayout>
  );
}
