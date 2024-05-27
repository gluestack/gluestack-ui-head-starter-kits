import React, {useState} from 'react';
import {Center} from '../../../components/center';
import {Text} from '../../../components/text';
import {Box} from '../../../components/box';
import {Button, ButtonText} from '../../../components/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '../../../components/form-control';
import {HStack} from '../../../components/hstack';
import {VStack} from '../../../components/vstack';
import {Heading} from '../../../components/heading';
import {Image} from 'react-native';
import {Icon} from '../../../components/icon';
import { Link} from '../../../components/link';
import {Toast, ToastTitle, useToast} from '../../../components/toast';
import {
  Input,
  InputField,
} from '../../../components/input';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Keyboard} from 'react-native';
import {AlertTriangle, ArrowLeftIcon} from 'lucide-react-native';
import GuestLayout from '../../layouts/GuestLayout';
import {useNavigation} from '@react-navigation/native';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});

type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

function Header() {
  const navigation = useNavigation();

  return (
    <HStack
      space="md"
      className="px-3 py-4 items-center bg-background-950
            dark:bg-background-0">
      <Link onPress={() => navigation.goBack()}>
        <Icon
          size="md"
          as={ArrowLeftIcon}
          className="text-typography-50 dark:text-typography-950"
        />
      </Link>
      <Text className="text-typography-50 dark:text-typography-950 text-lg">
        Forgot Password
      </Text>
    </HStack>
  );
}

function SideContainerWeb() {
  return (
    <Center
      className="bg-background-950
            dark:bg-background-0 md:flex-1 md:bg-primary-500 md:dark:bg-primary-500 md:py-48 hidden md:flex">
      <Image
        resizeMode="contain"
        className="w-200 h-40"
        source={require('./assets/images/forgotPassword_web_dark.png')}
        alt="Alternate Text"
      />
    </Center>
  );
}
function MobileScreenImage() {
  return (
    <Center
      className="px-4 -mb-0.5 bg-background-0
            dark:bg-background-50 md:py-48 md:px-12 md:bg-primary-500 md:dark:bg-primary-700">
      <Image
        source={require('./assets/images/forgotPassword_mobile_light.png')}
        resizeMode="contain"
        className="flex dark:hidden md:hidden h-40 w-48 self-center"
      />
      <Image
        className="hidden dark:flex mt-12 md:hidden h-40 w-48 self-center"
        source={require('./assets/images/forgotPassword_mobile_dark.png')}
        resizeMode="contain"
      />
    </Center>
  );
}

export default function ForgotPassword() {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // const toast = useToast();

  const navigation = useNavigation();

  const onSubmit = (_data: forgotPasswordSchemaType) => {
    // router.push('/verify-otp');
    //@ts-ignore
    navigation.navigate('OtpVerification');
    reset();
    // toast.show({
    //   placement: 'bottom right',
    //   render: ({id}) => {
    //     return (
    //       <Toast nativeID={id} variant="accent" action="success">
    //         <ToastTitle>OTP Send Successfully</ToastTitle>
    //       </Toast>
    //     );
    //   },
    // });
    reset();
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <GuestLayout>
      <VStack className="md:flex-row dark:bg-background-900 flex-1 bg-primary-500">
        <Box className="md:hidden">
          <Header />
          <MobileScreenImage />
        </Box>
        <Box className="md:flex hidden flex-1">
          <SideContainerWeb />
        </Box>
        <Box
          className="max-w-508 pt-2 pb-8 px-4 bg-background-0
            dark:bg-background-50 flex-1 md:pt-8 md:px-8">
          <VStack space="md" className="items-center md:items-start ">
            <Heading className="text-xl text-center md:text-left md:text-2xl">
              Forgot Password?
            </Heading>
            <Text className="text-sm font-normal text-center md:text-left">
              Not to worry! Enter email address associated with your account and
              we'll send a link to reset your password.
            </Text>
          </VStack>
          <FormControl
            className="my-8"
            isInvalid={(!!errors.email || isEmailFocused) && !!errors.email}
            isRequired={true}>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                validate: async value => {
                  try {
                    await forgotPasswordSchema.parseAsync({
                      email: value,
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
          <Button variant="solid" size="md" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="text-sm">SUBMIT</ButtonText>
          </Button>
        </Box>
      </VStack>
    </GuestLayout>
  );
}
