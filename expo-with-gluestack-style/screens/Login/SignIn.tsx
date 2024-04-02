import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { CheckIcon, Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Toast, useToast, ToastTitle } from '@/components/ui/toast';
import { LinkText, Link } from '@/components/ui/link';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
} from '@/components/ui/form-control';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Keyboard } from 'react-native';
import {
  AlertTriangle,
  EyeIcon,
  EyeOffIcon,
  ArrowLeftIcon,
} from 'lucide-react-native';
import { GoogleIcon, FacebookIcon } from './assets/Icons/Social';
import GuestLayout from '../../layouts/GuestLayout';
import StyledExpoRouterLink from '../../app/components/StyledExpoRouterLink';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character'
    ),
  rememberme: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // const toast = useToast();

  const onSubmit = (_data: SignInSchemaType) => {
    // toast.show({
    //   placement: 'bottom right',
    //   render: ({ id }) => {
    //     return (
    //       <Toast nativeID={id} variant="accent" action="success">
    //         <ToastTitle>Signed in successfully</ToastTitle>
    //       </Toast>
    //     );
    //   },
    // });
    reset();
    // Implement your own onSubmit and navigation logic here.
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <>
      <VStack className="justify-between">
        <FormControl
          isInvalid={(!!errors.email || isEmailFocused) && !!errors.email}
          isRequired={true}
        >
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signInSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Email"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  className="text-sm"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl
          className="my-6"
          isInvalid={!!errors.password}
          isRequired={true}
        >
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signInSchema.parseAsync({
                    password: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showPassword ? 'text' : 'password'}
                  className="text-sm"
                />
                <InputSlot onPress={handleState} className="pr-3">
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>
          <FormControlHelper></FormControlHelper>
        </FormControl>
      </VStack>
      <StyledExpoRouterLink ml="auto" href="/forgot-password">
        <LinkText className="text-xs">Forgot password?</LinkText>
      </StyledExpoRouterLink>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            className="my-5 self-start"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Remember me and keep me logged in</CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button
        variant="solid"
        size="lg"
        action="primary"
        onPress={handleSubmit(onSubmit)}
        className="mt-5"
      >
        <ButtonText>SIGN IN</ButtonText>
      </Button>
    </>
  );
};

function SideContainerWeb() {
  return (
    <Center
      className="bg-background-950
            dark:bg-background-0 flex-1"
    >
      <Image
        alt="gluestack-ui Pro"
        resizeMode="contain"
        className="w-8 h-10"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
      />
    </Center>
  );
}

function MobileHeader() {
  return (
    <VStack
      space="md"
      className="px-3 mt-4 bg-background-950
            dark:bg-background-0"
    >
      <HStack space="md" className="items-center">
        <StyledExpoRouterLink href="..">
          <Icon
            as={ArrowLeftIcon}
            className="color-typography-50 dark:color-typography-950"
          />
        </StyledExpoRouterLink>
        <Text className="text-lg color-typography-50 dark:color-typography-950">
          Sign In
        </Text>
      </HStack>
      <VStack space="xs" className="ml-1 my-4">
        <Heading className="color-typography-50 dark:color-typography-950">
          Welcome back
        </Heading>
        <Text className="text-md font-normal color-primary-300 dark:color-typography-400">
          Sign in to continue
        </Text>
      </VStack>
    </VStack>
  );
}

const Main = () => {
  return (
    <>
      <Box className="md:hidden">
        <MobileHeader />
      </Box>
      <Box
        className="px-4 md:px-8  bg-background-0
            dark:bg-background-50 py-8 flex-1 justify-between"
      >
        <Heading className="mb-8 md:flex md:text-2xl hidden">
          Sign in to continue
        </Heading>
        <SignInForm />
        <HStack space="md" className="my-4 items-center justify-center">
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
          <Text className="font-medium color-typography-400 dark:color-typography-300">
            or
          </Text>
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
        </HStack>
        <HStack
          space="lg"
          className="mt-6 md:mt-4 mb-9 justify-center items-center "
        >
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={FacebookIcon} />
            </Button>
          </Link>
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={GoogleIcon} />
            </Button>
          </Link>
        </HStack>
        <HStack space="xs" className="mt-auto items-center justify-center">
          <Text className="color-typography-500 text-sm dark:color-typography-400">
            Don't have an account?
          </Text>
          <StyledExpoRouterLink href="/signup">
            <LinkText className="text-sm">Sign up</LinkText>
          </StyledExpoRouterLink>
        </HStack>
      </Box>
    </>
  );
};

const SignIn = () => {
  return (
    <GuestLayout>
      <Box className="flex-1 hidden md:flex">
        <SideContainerWeb />
      </Box>
      <Box className="flex-1">
        <Main />
      </Box>
    </GuestLayout>
  );
};

export default SignIn;
