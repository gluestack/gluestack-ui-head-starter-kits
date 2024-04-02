import React, { useRef, useState } from 'react';
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
import { useToast} from '@/components/ui/toast';
import { LinkText} from '@/components/ui/link';
import { 
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelperText,
} from '@/components/ui/form-control';
import GuestLayout from '../../layouts/GuestLayout';
import { z } from 'zod';
import { AlertTriangle,ArrowLeftIcon } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StyledExpoRouterLink from '../../app/components/StyledExpoRouterLink';
import { router } from 'expo-router';

interface PinInputProps {
  refList: React.RefObject<HTMLInputElement>[];
  setInputFocus: React.Dispatch<React.SetStateAction<number>>;
  focusedIndex: number;
  setOtpInput: (otpInput: Array<string>) => void;
  otpInput: any;
}

function PinInput({
  refList,
  setInputFocus,
  focusedIndex,
  setOtpInput,
  otpInput,
}: PinInputProps) {
  return (
    <HStack space="xs">
      {Array.from({ length: 6 }, (_, index) => (
        <Input key={index} variant="outline" size="md" className='w-14'>
          <InputField
            //@ts-ignore
            ref={refList[index]}
            placeholder=""
            maxLength={1}
            onChangeText={(text) => {
              if (text.length === 1 && index < 5) {
                refList[index + 1].current?.focus();
                setInputFocus(index + 1);
              } else if (text.length === 0 && index > 0) {
                refList[index - 1].current?.focus();
              }

              const updateOtpAtIndex = (index: number, value: string) => {
                const newOtpInput = [...otpInput];
                newOtpInput[index] = value;
                setOtpInput(newOtpInput);
              };
              updateOtpAtIndex(index, text);
            }}
            className={`${focusedIndex===index?'border-b-primary-900':'border-b-background-500'} bg-background-0 md:w-1/6 lg:w-12 dark:bg-background-400 ${focusedIndex===index?'border-b-primary-500':'border-b-background-100'} w-14 text-center border-b-2 rounded-sm`}
          />
        </Input>
      ))}
    </HStack>
  );
}

function Header() {
  return (
    <HStack
      space="xs"
      className="px-3 my-4 items-center bg-background-950
            dark:bg-background-0"
    >
      <StyledExpoRouterLink href="/">
        <Icon
          as={ArrowLeftIcon}
          className="color-typography-50 dark:color-typography-50"
        />
      </StyledExpoRouterLink>
      <Text className="color-typography-50 text-lg dark:color-typography-50">
        OTP Verification
      </Text>
    </HStack>
  );
}
function SideContainerWeb() {
  return (
    <Center
      className="flex-1 bg-background-950
            dark:bg-background-0"
    >
      <Image
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        className="h-10 w-80"
      />
    </Center>
  );
}
function MainText() {
  return (
    <VStack space="xs">
      <Heading
        className='text-xl md:text-2xl md:pb-4'
      >
        Enter OTP
      </Heading>
      <HStack space="xs" className='items-center'>
        <Text
          className='text-sm color-typography-800 md:pb-12 dark:color-typography-400'
        >
          We have sent the OTP code to
          <Text
            className='font-bold color-typography-800 dark:color-typography-400 text-sm'
          >
            {''} 87******47
          </Text>
        </Text>
      </HStack>
    </VStack>
  );
}
function AccountLink() {
  return (
    <HStack
      space="xs"
      className='md:mt-40 mt-auto items-center justify-center'
    >
      <Text
        className='color-typography-800 dark:color-typography-400 text-sm'
      >
        Already have an account?
      </Text>
      <StyledExpoRouterLink href="/login">
        <LinkText  className='text-sm'>Sign In</LinkText>
      </StyledExpoRouterLink>
    </HStack>
  );
}
function ResendLink() {
  return (
    <HStack className='py-8'>
      <Text
        className='color-typography-800 dark:color-typography-400 text-sm'
      >
        Didn't receive the OTP?
      </Text>
      <StyledExpoRouterLink href="/verify-otp">
        <LinkText  className='text-sm'>RESEND OTP</LinkText>
      </StyledExpoRouterLink>
    </HStack>
  );
}

const OTPSchema = z.object({
  OTP: z.string().min(6, 'OTP must be at least 6 characters in length'),
});

type OTPSchemaType = z.infer<typeof OTPSchema>;

export default function OtpVerification() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema),
  });

  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const thirdInput = useRef<HTMLInputElement>(null);
  const fourthInput = useRef<HTMLInputElement>(null);
  const fifthInput = useRef<HTMLInputElement>(null);
  const sixthInput = useRef<HTMLInputElement>(null);

  const refList = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ];

  const [inputFocus, setInputFocus] = useState<number>(-1);
  const [validationError, setValidationError] = useState<string | null>(null); // State to hold validation error message

  // const toast = useToast();

  // const onSubmit = (_data: OTPSchemaType) => {
  //   toast.show({
  //     placement: 'bottom right',
  //     render: ({ id }) => {
  //       const pinValues = refList.map((ref) => ref?.current?.value);
  //       const pin = pinValues.join('');
  //       const Count = otpInput.filter((value) => value !== '').length;

  //       if (Count < 6) {
  //         setValidationError('OTP must be at least 6 characters in length');
  //         return;
  //       }
  //       setValidationError(null);

  //       return (
  //         <Toast nativeID={id} variant="accent" action="success">
  //           <ToastTitle>OTP sent successfully</ToastTitle>
  //         </Toast>
  //       );
  //     },
  //   });
  //   reset();
  //   // Implement your own onSubmit and navigation logic here.
  //   router.replace('/create-password');
  // };

  // const handleKeyPress = () => {
  //   Keyboard.dismiss();
  //   handleSubmit(onSubmit)();
  // };

  return (
    <GuestLayout>
      <Box className="flex md:hidden">
        <Header />
      </Box>
      <Box className="flex-1 md:flex hidden">
        <SideContainerWeb />
      </Box>
      <Box
        className="max-w-[508px] flex-1 px-4 py-8 bg-background-0
            dark:bg-background-50 md:p-8"
      >
        <MainText />
        <VStack space="md" className="mt-6">
          <FormControl>
            <PinInput
              refList={refList}
              setInputFocus={setInputFocus}
              focusedIndex={inputFocus}
              otpInput={otpInput}
              setOtpInput={setOtpInput}
            />
            {validationError && (
              <Text className="text-sm color-error-700">{validationError}</Text>
            )}
            <FormControlHelperText className="mt-8">
              <ResendLink />
            </FormControlHelperText>
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} size="sm" />
              <FormControlErrorText>
                {errors?.OTP?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => router.replace('/create-password')}
          >
            <ButtonText className="text-sm">PROCEED </ButtonText>
          </Button>
        </VStack>
        <AccountLink />
      </Box>
    </GuestLayout>
  );
}
