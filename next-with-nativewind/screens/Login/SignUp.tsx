import React, { useState } from "react";
import { Box } from "@/components/box";
import { VStack } from "@/components/vstack";
import { HStack } from "@/components/hstack";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { Link, LinkText } from "@/components/link";
import { Button, ButtonText, ButtonIcon } from "@/components/button";
import { Image } from "@/components/image";
import { Divider } from "@/components/divider";
import { Center } from "@/components/center";
import { Heading } from "@/components/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/input";
import { Toast, useToast, ToastTitle } from "@/components/toast";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/checkbox";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/form-control";
import { Controller, useForm } from "react-hook-form";

import {
  AlertTriangle,
  EyeIcon,
  EyeOffIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "lucide-react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Keyboard } from "react-native";
import { FacebookIcon, GoogleIcon } from "./assets/Icons/Social";
import GuestLayout from "../../layouts/GuestLayout";
import { Link as RNLink } from "react-native-web-next-link";
import { useRouter } from "next/navigation";


const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  confirmpassword: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  rememberme: z.boolean().optional(),
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

function SideContainerWeb() {
  return (
    <Center
      className="bg-background-950
            dark:bg-background-0 flex-1"
    >
      <Image
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require("./assets/images/gluestackUiProLogo_web_light.svg")}
        className="w-80 h-10"
      />
    </Center>
  );
}

function MobileHeader() {
  return (
    <VStack
      space="md"
      className="px-3 mt-4 mb-5 bg-background-950
            dark:bg-background-0"
    >
      <HStack space="md" className="items-center">
        <RNLink href="..">
          <Icon
            as={ArrowLeftIcon}
            className="color-typography-50 dark:color-typography-950"
          />
        </RNLink>
        <Text className="text-lg color-typography-50 dark:color-typography-950">
          Sign Up
        </Text>
      </HStack>
      <VStack space="xs" className="ml-1 my-4">
        <Heading className="color-typography-50 dark:color-typography-950">
          Welcome
        </Heading>
        <Text className="color-primary-300 text-lg dark:color-typography-300">
          Sign up to continue
        </Text>
      </VStack>
    </VStack>
  );
}

const SignUpForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [pwMatched, setPwMatched] = useState(false);
  const router=useRouter()
  // const toast = useToast();

  const onSubmit = (_data: SignUpSchemaType) => {
    if (_data.password === _data.confirmpassword) {
      setPwMatched(true);
      // toast.show({
      //   placement: 'bottom right',
      //   render: ({ id }) => {
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
      //   render: ({ id }) => {
      //     return (
      //       <Toast nativeID={id} action="error">
      //         <ToastTitle>Passwords do not match</ToastTitle>
      //       </Toast>
      //     );
      //   },
      // });
    }
    // Implement your own onSubmit and navigation logic here.
    // Navigate to appropriate location
    router.replace("/login");
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleConfirmPwState = () => {
    setShowConfirmPassword((showState) => {
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
                  await signUpSchema.parseAsync({ email: value });
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
          isInvalid={!!errors.password}
          isRequired={true}
          className="my-6"
        >
          <Controller
            defaultValue=""
            name="password"
            control={control}
            rules={{
              validate: async (value) => {
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
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showPassword ? "text" : "password"}
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
        </FormControl>
        <FormControl isInvalid={!!errors.confirmpassword} isRequired={true}>
          <Controller
            defaultValue=""
            name="confirmpassword"
            control={control}
            rules={{
              validate: async (value) => {
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
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showConfirmPassword ? "text" : "password"}
                  className="text-sm"
                />
                <InputSlot onPress={handleConfirmPwState} className="pr-3">
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
        render={({ field: { onChange, value } }) => (
          <Checkbox
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            alignSelf="flex-start"
            className="mt-5"
          >
            <CheckboxIndicator className="mr-2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel className="text-sm">
              I accept the{" "}
              <RNLink href='#'>
                <LinkText className="mt-0.5 web:mt-0">Terms of Use</LinkText>
              </RNLink>{" "}
              &{" "}
              <RNLink href='#'>
                <LinkText className="mt-0.5 web:mt-0">Privacy Policy</LinkText>
              </RNLink>
            </CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button
        variant="solid"
        action="primary"
        size="lg"
        onPress={handleSubmit(onSubmit)}
        className="mt-5"
      >
        <ButtonText>SIGN UP</ButtonText>
      </Button>
    </>
  );
};

function SignUpFormComponent() {
  return (
    <>
      <Box className="md:hidden">
        <MobileHeader />
      </Box>
      <Box
        className="px-4 md:px-8 py-8 flex-1 bg-background-0
            dark:bg-background-50 justify-between"
      >
        <Heading className="hidden mb-8 md:flex md:text-2xl">
          Sign up to continue
        </Heading>
        <SignUpForm />
        <HStack space="md" className="my-4 items-center justify-center">
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
          <Text className="font-medium color-typography-400 dark:color-typography-300">
            or
          </Text>
          <Divider className="w-2/6 bg-background-200 dark:bg-background-700" />
        </HStack>
        <HStack
          space="lg"
          className="md:mt-4 mt-6 mb-9 items-center justify-center"
        >
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={FacebookIcon} />
            </Button>
          </Link>
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={GoogleIcon} className="size-4" />
            </Button>
          </Link>
        </HStack>
        <HStack space="xs" className="items-center justify-center mt-auto">
          <Text className="text-sm color-typography-500 dark:color-typography-400">
            Already have an account?
          </Text>
          <RNLink href="/login">
            <LinkText className="text-sm">Sign In</LinkText>
          </RNLink>
        </HStack>
      </Box>
    </>
  );
}

export default function SignUp() {
  return (
    <GuestLayout>
      <Box className="md:flex hidden flex-1">
        <SideContainerWeb />
      </Box>
      <Box className="flex-1">
        <SignUpFormComponent />
      </Box>
    </GuestLayout>
  );
}
