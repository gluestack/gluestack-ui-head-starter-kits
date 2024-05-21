import React from 'react';
import {Box} from '../../../components/box';
import {VStack} from '../../../components/vstack';
import {Center} from '../../../components/center';
// import {Image} from '../../../components/image';
import {Image} from 'react-native';
import {Button, ButtonText} from '../../../components/button';
import GuestLayout from '../../layouts/GuestLayout';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';

// to render login and sign up buttons
function ActionButtons() {
  const navigation = useNavigation();
  return (
    <VStack space="xs" className="mt-10 md:mt-12 ">
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        className="hover:bg-background-100 hover:text-primary-500 bg-background-0 dark:bg-background-950 "
        onPress={() => navigation.navigate('SignIn')}>
        <ButtonText className="font-bold decoration-0 text-primary-500 dark:text-background-100">
          LOGIN
        </ButtonText>
      </Button>

      <Button
        size="md"
        variant="outline"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={() => navigation.navigate('SignUp')}
        className="hover:bg-background-0 hover:text-primary-500 border-primary-0 my-4">
        <ButtonText className="decoration-0 text-typography-100 dark:text-typography-900">
          SIGN UP
        </ButtonText>
      </Button>
    </VStack>
  );
}

function HeaderLogo() {
  const {colorScheme} = useColorScheme();
  return (
    <Box className="items-center justify-center ">
      {colorScheme === 'light' ? (
        <Image
          alt="gluestack-ui Pro"
          source={require('./assets/images/gluestack-fulllogo-light.png')}
          className="w-96 h-16"
        />
      ) : (
        <Image
          alt="gluestack-ui Pro"
          source={require('./assets/images/gluestack-fulllogo-dark.png')}
          className="w-96 h-16"
        />
      )}
    </Box>
  );
}

export default function SplashScreen() {
  return (
    // place GluestackUIProvider in your app root accordingly
    <GuestLayout>
      <Center className="w-full flex-1">
        <Box className="max-w-[508px] w-full min-h-[100px] md:px-8 px-4 justify-center">
          <HeaderLogo />
          <ActionButtons />
        </Box>
      </Center>
    </GuestLayout>
  );
}
