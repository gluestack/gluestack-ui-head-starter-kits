import React, { useState } from 'react';
import { Box } from "@/components/ui/box";
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Button , ButtonText} from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Input,InputField } from '@/components/ui/input';
import { Toast,useToast,ToastTitle } from '@/components/ui/toast';
import { 
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '@/components/ui/form-control';
import GuestLayout from '../../layouts/GuestLayout';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Keyboard } from 'react-native';
import { AlertTriangle,ArrowLeftIcon } from 'lucide-react-native';
import StyledExpoRouterLink from '../../app/components/StyledExpoRouterLink';
import { router } from 'expo-router';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});
type SignUpSchemaType = z.infer<typeof forgotPasswordSchema>;

function Header() {
  return (
    <HStack
      space="md"
      className="px-3 py-4 items-center bg-background-950
            dark:bg-background-0"
    >
      <StyledExpoRouterLink href="..">
        <Icon
          size="md"
          as={ArrowLeftIcon}
          className="color-typography-50 dark:color-typography-950"
        />
      </StyledExpoRouterLink>
      <Text className="color-typography-50 text-lg dark:color-typography-50">
        Forgot Password
      </Text>
    </HStack>
  );
}

function SideContainerWeb() {
  return (
    <Center
      className="bg-background-950
            dark:bg-background-0 md:py-$48 flex-1"
    >
      <Image
        resizeMode="contain"
        source={require('./assets/images/forgotPassword_web_dark.png')}
        alt="Alternate Text"
        className="w-[200px] h-40"
      />
    </Center>
  );
}

function MobileScreenImage() {
  return (
    <Center
      className="px-4 -mb-0.5 bg-background-950
            dark:bg-background-0 md:py-48 md:px-12 md:bg-primary-500 md:dark:bg-primary-700"
    >
      <Image
        className="flex dark:hidden md:hidden md:dark:hidden h-40 w-48"
        source={require('./assets/images/forgotPassword_mobile_light.png')}
        resizeMode="contain"
        alignSelf="center"
      />
      <Image
        className="h-40 w-48 hidden dark:flex md:hidden"
        source={require('./assets/images/forgotPassword_mobile_dark.png')}
        resizeMode="contain"
        alignSelf="center"
      />
    </Center>
  );
}

export default function ForgotPassword() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // const toast = useToast();

  const onSubmit = (_data: SignUpSchemaType) => {
    // toast.show({
    //   placement: 'bottom right',
    //   render: ({ id }) => {
    //     return (
    //       <Toast nativeID={id} variant="accent" action="success">
    //         <ToastTitle>OTP sent successfully </ToastTitle>
    //       </Toast>
    //     );
    //   },
    // });
    reset();

    // Navigate screen to appropriate location
    router.push('/verify-otp');
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <GuestLayout>
      <VStack className="bg-primary-500 md:flex-row dark:bg-background-900 flex-1">
        <Box className="md:hidden">
          <Header />
          <MobileScreenImage />
        </Box>
        <Box className="md:flex hidden flex-1">
          <SideContainerWeb />
        </Box>
        <Box
          className="max-w-[508px] pt-0 pb-8 px-4 bg-background-0
            dark:bg-background-50 flex-1 md:pt-8 md:px-8"
        >
          <VStack space="md" className="items-center md:items-start">
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
            isRequired={true}
          >
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                validate: async (value) => {
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
              <FormControlErrorIcon as={AlertTriangle} size="sm" />
              <FormControlErrorText>
                {errors?.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button variant="solid" size="lg" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="text-sm">Send OTP</ButtonText>
          </Button>
        </Box>
      </VStack>
    </GuestLayout>
  );
}
