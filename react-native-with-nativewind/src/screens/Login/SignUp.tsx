import React, {useState} from 'react';
import {Center} from '../../../components/center';
import {Text} from '../../../components/text';
import {Box} from '../../../components/box';
import {Button, ButtonText, ButtonIcon} from '../../../components/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
} from '../../../components/form-control';
import {HStack} from '../../../components/hstack';
import {VStack} from '../../../components/vstack';
import {Heading} from '../../../components/heading';
import {Image} from '../../../components/image';
import {Icon} from '../../../components/icon';
import {LinkText, Link} from '../../../components/link';
import {Divider} from '../../../components/divider';
import {Toast, ToastTitle, useToast} from '../../../components/toast';
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '../../../components/input';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '../../../components/checkbox';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  AlertTriangle,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  ArrowLeftIcon,
} from 'lucide-react-native';
import {FacebookIcon, GoogleIcon} from './assets/Icons/Social';
import {Keyboard} from 'react-native';
import GuestLayout from '../../layouts/GuestLayout';
import {useNavigation} from '@react-navigation/native';

const signUpSchema = z.object({
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
  confirmpassword: z
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
type SignUpSchemaType = z.infer<typeof signUpSchema>;
function SideContainerWeb() {
  return (
    <Center
      className="bg-background-950
            dark:bg-background-0  flex-1">
      <Image
        className="h-10 w-80"
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
      />
    </Center>
  );
}
function MobileHeader() {
  const navigation = useNavigation();

  return (
    <VStack
      space="md"
      className="px-3 mt-4 mb-5  bg-background-950
            dark:bg-background-0">
      <HStack space="md" className="items-center">
        <Link onPress={() => navigation.goBack()}>
          <Icon
            as={ArrowLeftIcon}
            className="text-typography-50 dark:text-typography-950"
          />
        </Link>
        <Text className="text-lg text-typography-50 dark:text-typography-950">
          Sign Up
        </Text>
      </HStack>
      <VStack space="xs" className="ml-1 my-4">
        <Heading className="text-typography-50 dark:text-typography-950">
          Welcome
        </Heading>
        <Text className="text-primary-300 text-sm dark:text-background-400">
          Sign up to continue
        </Text>
      </VStack>
    </VStack>
  );
}
const SignUpForm = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [pwMatched, setPwMatched] = useState(false);
  // const toast = useToast();
  const onSubmit = (_data: SignUpSchemaType) => {
    if (_data.password === _data.confirmpassword) {
      setPwMatched(true);
      // toast.show({
      //   placement: 'bottom right',
      //   render: ({id}) => {
      //     return (
      //       <Toast nativeID={id} variant="accent" action="success">
      //         <ToastTitle>Signed up successfully</ToastTitle>
      //       </Toast>
      //     );
      //   },
      // });
      reset();
    } else {
      // toast.show({
      //   placement: 'bottom right',
      //   render: ({id}) => {
      //     return (
      //       <Toast nativeID={id} action="error">
      //         <ToastTitle>Passwords do not match</ToastTitle>
      //       </Toast>
      //     );
      //   },
      // });
    }
    // Implement your own onSubmit and navigation logic here.
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const handleConfirmPwState = () => {
    setShowConfirmPassword(showState => {
      return !showState;
    });
  };
  return (
    <>
      <VStack className="justify-between">
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
                  await signUpSchema.parseAsync({email: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  className="text-sm"
                  placeholder="Email"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
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
            defaultValue=""
            name="password"
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signUpSchema.parseAsync({
                    password: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
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
                <InputSlot onPress={handleState} size='sm'>
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
        <FormControl isInvalid={!!errors.confirmpassword} isRequired={true}>
          <Controller
            defaultValue=""
            name="confirmpassword"
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signUpSchema.parseAsync({
                    password: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  placeholder="Confirm Password"
                  className="text-sm"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <InputSlot onPress={handleConfirmPwState} size='sm'>
                  <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.confirmpassword?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>
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
            className="mt-5 self-start">
            <CheckboxIndicator className="mr-2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel className="text-sm">
              I accept the{' '}
              <Link>
                <LinkText className="web:mt-0 mt-0.5">Terms of Use</LinkText>
              </Link>{' '}
              &{' '}
              <Link>
                <LinkText
                  className="web:mt-0 mt-0.5">
                  Privacy Policy
                </LinkText>
              </Link>
            </CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button
        variant="solid"
        size="lg"
        className='mt-5'
        onPress={handleSubmit(onSubmit)}>
        <ButtonText className='text-sm'> SIGN UP</ButtonText>
      </Button>
    </>
  );
};
function SignUpFormComponent() {
  const navigation = useNavigation();

  return (
    <>
      <Box className="md:hidden">
        <MobileHeader />
      </Box>
      <Box
        className="px-4 md:px-8 py-8 flex-1 bg-background-0
            dark:bg-background-50 justify-between ">
        <Heading className="hidden mb-8 md:flex md:text-2xl">
          Sign up to continue
        </Heading>
        <SignUpForm />
        <HStack space="md" className="my-4 items-center justify-center">
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
          <Text className="font-medium text-primary-400 dark:text-background-300">
            or
          </Text>
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
        </HStack>
        <HStack
          space="lg"
          className="md:mt-4 mt-6 mb-9 items-center justify-center">
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
        <HStack space="xs" className="items-center justify-center mt-auto">
          <Text className="text-primary-500 dark:text-background-400 text-sm">
            Already have an account?
          </Text>
          <Link onPress={() => navigation.navigate('SignIn')}>
            <Text className="text-sm underline text-blue-300">Sign In</Text>
          </Link>
        </HStack>
      </Box>
    </>
  );
}
export default function SignUp() {
  return (
    <GuestLayout>
      <Box
        className='hidden flex-1 md:flex'
        >
        <SideContainerWeb />
      </Box>
      <Box className='flex-1'>
        <SignUpFormComponent />
      </Box>
    </GuestLayout>
  );
}
