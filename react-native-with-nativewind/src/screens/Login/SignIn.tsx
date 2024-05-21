import React, {useState} from 'react';
import {Center} from '../../../components/center';
import {Text} from '../../../components/text';
import {Box} from '../../../components/box';
import {Button,ButtonText,ButtonIcon} from '../../../components/button';
import { FormControl,FormControlError,FormControlErrorIcon,FormControlErrorText,FormControlHelper } from '../../../components/form-control';
import { HStack } from '../../../components/hstack';
import { VStack } from '../../../components/vstack';
import { Heading } from '../../../components/heading';
import { Image } from '../../../components/image';
import { Icon } from '../../../components/icon';
import { LinkText,Link } from '../../../components/link';
import { Divider } from '../../../components/divider';
import { Toast,ToastTitle,useToast } from '../../../components/toast';
import { Input,InputField,InputIcon,InputSlot } from '../../../components/input';
import {  Checkbox,CheckboxIcon,CheckboxIndicator,CheckboxLabel } from '../../../components/checkbox';
import { ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Keyboard} from 'react-native';
import {
  AlertTriangle,
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Navigation,
} from 'lucide-react-native';

import {GoogleIcon, FacebookIcon} from './assets/Icons/Social';

import GuestLayout from '../../layouts/GuestLayout';

import {useNavigation} from '@react-navigation/native';

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
      'One special character',
    ),
  rememberme: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const navigation = useNavigation();

  // const toast = useToast();

  const onSubmit = (_data: SignInSchemaType) => {
    // toast.show({
    //   placement: 'bottom right',
    //   render: ({id}) => {
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
    setShowPassword(showState => {
      return !showState;
    });
  };

  return (
    <>
      <VStack className="justify-center">
        <FormControl
          isInvalid={(!!errors.email || isEmailFocused) && !!errors.email}
          isRequired={true}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signInSchema.parseAsync({email: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input className="justify-between flex">
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
            <FormControlErrorIcon as={AlertTriangle} size="md" />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl
          isInvalid={!!errors.password}
          isRequired={true}
          className="my-6">
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              validate: async value => {
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
            render={({field: {onChange, onBlur, value}}) => (
              <Input className="justify-between flex">
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
                <InputSlot onPress={handleState} size="sm">
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} size="sm" />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>

          <FormControlHelper></FormControlHelper>
        </FormControl>
      </VStack>
      <Link
        onPress={() => navigation.navigate('ForgotPassword')}
        className="ml-auto">
        <Text className="text-sm underline text-blue-300">
          Forgot password?
        </Text>
      </Link>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({field: {onChange, value}}) => (
          <Checkbox
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            className="self-start my-5">
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
        className="mt-5"
        onPress={handleSubmit(onSubmit)}>
        <ButtonText className="text-sm "> SIGN IN</ButtonText>
      </Button>
    </>
  );
};

function SideContainerWeb() {
  return (
    <Center
      className="flex-1 bg-background-950
            dark:bg-background-0">
      <Image
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        className="w-80 h-10"
      />
    </Center>
  );
}

function MobileHeader() {
  const navigation = useNavigation();
  return (
    <VStack
      space="md"
      className="px-3 mt-4 bg-background-950
            dark:bg-background-0">
      <HStack space="md" className="items-center">
        <Link onPress={() => navigation.goBack()}>
          <Icon
            as={ArrowLeftIcon}
            className="text-primary-50 dark:text-primary-50"
          />
        </Link>
        <Text className="text-typography-50 dark:text-typography-950 text-lg">
          Sign In
        </Text>
      </HStack>
      <VStack space="xs" className="ml-1 my-4">
        <Heading className="text-typography-50 dark:text-typography-950">
          Welcome back
        </Heading>
        <Text className="text-sm font-normal text-primary-100 ">
          Sign in to continue
        </Text>
      </VStack>
    </VStack>
  );
}

const Main = () => {
  const navigation = useNavigation();
  return (
    <>
      <Box className="md:hidden">
        <MobileHeader />
      </Box>
      <Box
        className="px-4 md:px-8 py-8 flex-1 bg-background-0
            dark:bg-background-50 justify-between ">
        <Heading className="hidden mb-8 md:flex md:text-2xl ">
          Sign in to continue
        </Heading>
        <SignInForm />
        <HStack space="md" className="my-4 items-center justify-center">
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
          <Text className="font-medium text-primary-400 dark:text-primary-300">
            or
          </Text>
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
        </HStack>
        <HStack
          className="mt-6 md:mt-4 mb-9 items-center justify-center"
          space="lg">
          <Link href="">
            <Button
              action="secondary"
              variant="link"
              onPress={() => {}}
              className="w-10">
              <ButtonIcon as={FacebookIcon} size="md" />
            </Button>
          </Link>
          <Link href="">
            <Button
              action="secondary"
              variant="link"
              onPress={() => {}}
              className="w-10">
              <ButtonIcon as={GoogleIcon} size="md" />
            </Button>
          </Link>
        </HStack>
        <HStack className="items-center justify-center mt-auto">
          <Text className="text-primary-500 text-sm dark:text-background-400">
            Don't have an account?
          </Text>
          <Link onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-sm underline text-blue-300">Sign up</Text>
          </Link>
        </HStack>
      </Box>
    </>
  );
};

export default function SignIn() {
  return (
    <GuestLayout>
      <Box  className='hidden md:flex flex-1'>
        <SideContainerWeb />
      </Box>
      <Box className='flex-1'>
        <Main />
      </Box>
    </GuestLayout>
  );
}
