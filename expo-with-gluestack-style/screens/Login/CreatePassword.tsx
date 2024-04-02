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
import { Input,InputField ,InputIcon,InputSlot} from '@/components/ui/input';
import { Toast,useToast,ToastTitle } from '@/components/ui/toast';
import { 
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelperText,
  FormControlHelper,
} from '@/components/ui/form-control';
import { AlertTriangle, ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Keyboard ,ScrollView} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import GuestLayout from '../../layouts/GuestLayout';
import StyledExpoRouterLink from '../../app/components/StyledExpoRouterLink';
import { router } from 'expo-router';

const createPasswordSchema = z.object({
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
  confirmpassword: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character'
    ),
});

type CreatePasswordSchemaType = z.infer<typeof createPasswordSchema>;

export default function CreatePassword() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(createPasswordSchema),
  });

  // const toast = useToast();

  const onSubmit = (data: CreatePasswordSchemaType) => {
    if (data.password === data.confirmpassword) {
      // toast.show({
      //   placement: 'bottom right',
      //   render: ({ id }) => {
      //     return (
      //       <Toast nativeID={id} variant="accent" action="success">
      //         <ToastTitle>Password updated successfully</ToastTitle>
      //       </Toast>
      //     );
      //   },
      // });

      // Navigate screen to appropriate location
      router.replace('/');

      reset();
    } else {
      // toast.show({
      //   placement: 'bottom right',
      //   render: ({ id }) => {
      //     return (
      //       <Toast nativeID={id} variant="accent" action="error">
      //         <ToastTitle>Passwords do not match</ToastTitle>
      //       </Toast>
      //     );
      //   },
      // });
    }
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

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showConfirmPassword) => {
      return !showConfirmPassword;
    });
  };

  function Header() {
    return (
      <HStack
        space="md"
        className="px-3 my-4 items-center bg-background-950
            dark:bg-background-0"
      >
        <StyledExpoRouterLink href="..">
          <Icon
            size="md"
            as={ArrowLeftIcon}
            className="color-typography-50 dark:color-typography-50"
          />
        </StyledExpoRouterLink>
        <Text className="color-typography-50 text-lg dark:color-typography-50">
          Create Password
        </Text>
      </HStack>
    );
  }

  function ScreenText() {
    return (
      <VStack space="md">
        <Heading
          className='text-xl md:text-2xl'
        >
          Create new password
        </Heading>
        <Text className='text-sm'>
          Your new password must be different from previous used passwords and
          must be of at least 8 characters.
        </Text>
      </VStack>
    );
  }

  function WebSideContainer() {
    return (
      <Center
        className="flex-1 bg-background-950
            dark:bg-background-0"
      >
        <Image
          className="h-10 w-80"
          alt="Gluestack-ui pro"
          resizeMode="contain"
          source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        />
      </Center>
    );
  }
  return (
    <GuestLayout>
      <Box className="md:hidden">
        <Header />
      </Box>
      <Box className="flex-1 md:flex hidden">
        <WebSideContainer />
      </Box>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          flex: 1,
        }}
        bounces={false}
      >
        <Box
          className="bg-background-0
            dark:bg-background-50 pt-8 pb-4 px-4 md:p-8"
        >
          <ScreenText />
          <VStack space="md" className="mt-7 md:mt-8">
            <Box className="w-full md:w-80">
              <FormControl isInvalid={!!errors.password} isRequired={true}>
                <Controller
                  defaultValue=""
                  name="password"
                  control={control}
                  rules={{
                    validate: async (value) => {
                      try {
                        await createPasswordSchema.parseAsync({
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
                      <InputSlot onPress={handleState} className="mr-2">
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
                <FormControlHelperText>
                  <Text size="xs">Must be at least 8 characters</Text>
                </FormControlHelperText>
                <FormControlHelper></FormControlHelper>
              </FormControl>
            </Box>
            <Box className="w-full md:w-80">
              <FormControl
                isInvalid={!!errors.confirmpassword}
                isRequired={true}
              >
                <Controller
                  defaultValue=""
                  name="confirmpassword"
                  control={control}
                  rules={{
                    validate: async (value) => {
                      try {
                        await createPasswordSchema.parseAsync({
                          confirmpassword: value,
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
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="text-sm"
                      />
                      <InputSlot
                        onPress={handleConfirmPasswordState}
                        className="mr-2"
                      >
                        <InputIcon
                          as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                        />
                      </InputSlot>
                    </Input>
                  )}
                />

                <FormControlError>
                  <FormControlErrorIcon size="md" as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors?.confirmpassword?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlHelperText>
                  <Text size="xs"> Both Password must match</Text>
                </FormControlHelperText>
                <FormControlErrorText>
                  <Text size="xs">{errors.confirmpassword?.message}</Text>
                </FormControlErrorText>
              </FormControl>
            </Box>
          </VStack>

          <Button
            variant="solid"
            size="lg"
            onPress={handleSubmit(onSubmit)}
            className="mt-auto md:mt-40"
          >
            <ButtonText className="text-sm">UPDATE PASSWORD</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </GuestLayout>
  );
}
