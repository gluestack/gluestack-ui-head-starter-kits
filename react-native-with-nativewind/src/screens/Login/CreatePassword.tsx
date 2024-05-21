import React, {useState} from 'react';
import {
  ScrollView,
} from 'react-native';
import {Center} from '../../../components/center';
import {Text} from '../../../components/text';
import {Box} from '../../../components/box';
import {Button, ButtonText} from '../../../components/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelperText,
  FormControlHelper
} from '../../../components/form-control';
import {HStack} from '../../../components/hstack';
import {VStack} from '../../../components/vstack';
import {Heading} from '../../../components/heading';
import {Image} from '../../../components/image';
import {Icon} from '../../../components/icon';
import { Link} from '../../../components/link';
import {Toast, ToastTitle, useToast} from '../../../components/toast';
import {InputIcon, InputSlot,Input, InputField} from '../../../components/input';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Keyboard} from 'react-native';

import {
  AlertTriangle,
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react-native';

import GuestLayout from '../../layouts/GuestLayout';

import {useNavigation} from '@react-navigation/native';

const createPasswordSchema = z.object({
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
});

type CreatePasswordSchemaType = z.infer<typeof createPasswordSchema>;

export default function CreatePassword() {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(createPasswordSchema),
  });

  const navigation = useNavigation();
  const toast = useToast();

  const onSubmit = (data: CreatePasswordSchemaType) => {
    if (data.password === data.confirmpassword) {
      // Implement your own onSubmit logic and navigation logic here.
      //@ts-ignore
      navigation.navigate('SignIn');

      toast.show({
        placement: 'bottom right',
        render: ({id}) => {
          return (
            <Toast nativeID={id} variant="accent" action="success">
              <ToastTitle>Passwords matched, update successful</ToastTitle>
            </Toast>
          );
        },
      });
      reset();
    } else {
      toast.show({
        placement: 'bottom right',
        render: ({id}) => {
          return (
            <Toast nativeID={id} variant="accent" action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
    }
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

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword(showConfirmPassword => {
      return !showConfirmPassword;
    });
  };

  function Header() {
    const navigation = useNavigation();

    return (
      <HStack
        space="md"
        className="px-3 my-4 items-center bg-background-950
            dark:bg-background-0">
        <Link onPress={() => navigation.goBack()}>
          <Icon
            size="md"
            as={ArrowLeftIcon}
            className="text-typography-50 dark:text-typography-50"
          />
        </Link>
        <Text className="text-typography-50 dark:text-typography-50 text-lg">
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
        <Text  className='text-sm'>
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
            dark:bg-background-0">
        <Image
          className="w-80 h-10"
          alt="gluestack-ui Pro"
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
      <Box className="hidden md:flex flex-1">
        <WebSideContainer />
      </Box>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        bounces={false}
        style={{
          flex: 1,
        }}>
        <Box
          className="bg-background-0
            dark:bg-background-50 pt-8 pb-4 px-4 md:p-8 flex-1">
          <ScreenText />
          <VStack space="md" className="mt-7 md:mt-8">
            <Box className="w-full md:w-80">
              <FormControl isInvalid={!!errors.password} isRequired={true}>
                <Controller
                  defaultValue=""
                  name="password"
                  control={control}
                  rules={{
                    validate: async value => {
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
                      <InputSlot onPress={handleState} className="mr-2">
                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                      </InputSlot>
                    </Input>
                  )}
                />
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} size="md" />
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
                isRequired={true}>
                <Controller
                  defaultValue=""
                  name="confirmpassword"
                  control={control}
                  rules={{
                    validate: async value => {
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
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input>
                      <InputField
                        className="text-sm"
                        placeholder="Confirm Password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        onSubmitEditing={handleKeyPress}
                        returnKeyType="done"
                        type={showConfirmPassword ? 'text' : 'password'}
                      />
                      <InputSlot
                        onPress={handleConfirmPasswordState}
                        className="mr-2">
                        <InputIcon
                          as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                        />
                      </InputSlot>
                    </Input>
                  )}
                />

                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} size="md" />
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
            className="mt-auto md:mt-40"
            onPress={handleSubmit(onSubmit)}>
            <ButtonText className="text-sm">UPDATE PASSWORD</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </GuestLayout>
  );
}
