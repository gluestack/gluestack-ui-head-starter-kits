import React, {useRef, useState} from 'react';
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
} from '../../../components/form-control';
import {HStack} from '../../../components/hstack';
import {VStack} from '../../../components/vstack';
import {Heading} from '../../../components/heading';
import {Image} from '../../../components/image';
import {Icon} from '../../../components/icon';
import {LinkText, Link} from '../../../components/link';
import {Toast, ToastTitle, useToast} from '../../../components/toast';
import {
  Input,
  InputField,
} from '../../../components/input';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {AlertTriangle,ArrowLeftIcon} from 'lucide-react-native';
import GuestLayout from '../../layouts/GuestLayout';
import {useNavigation} from '@react-navigation/native';

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
      {Array.from({length: 6}, (_, index) => (
        <Input key={index} variant="outline" size="md" className="w-14">
          <InputField
            //@ts-ignore
            ref={refList[index]}
            placeholder=""
            maxLength={1}
            className={`${
              focusedIndex === index
                ? 'border-b-primary-900'
                : 'border-b-background-500'
            } bg-background-0 md:w-1/6 lg:w-25/2 dark:bg-background-400 ${
              focusedIndex === index
                ? 'border-b-primary-500'
                : 'border-b-background-100'
            } w-100/7 text-center border-b-2 rounded-sm`}
            onChangeText={text => {
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
          />
        </Input>
      ))}
    </HStack>
  );
}

function Header() {
  const navigation = useNavigation();

  return (
    <HStack
      space="xs"
      className="px-3 my-4 items-center bg-background-950
            dark:bg-background-0">
      <Link onPress={() => navigation.goBack()}>
        <Icon
          as={ArrowLeftIcon}
          className="text-typography-50 dark:text-typography-50"
        />
      </Link>
      <Text className="text-typography-50 dark:text-typography-900 text-lg">
        OTP Verification
      </Text>
    </HStack>
  );
}
function SideContainerWeb() {
  return (
    <Center
      className="flex-1 bg-background-950
            dark:bg-background-0">
      <Image
        className="h-10 w-80"
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
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
          className='text-primary-800 md:pb-12 dark:text-background-400 text-sm'
          >
          We have sent the OTP code to
          <Text
            className='font-bold text-primary-800 dark:text-background-400 text-sm'
            >
            {} 87******47
          </Text>
        </Text>
      </HStack>
    </VStack>
  );
}
function AccountLink() {
  const navigation = useNavigation();

  return (
    <HStack
      space="xs"
      className='md:mt-40 mt-auto items-center justify-center'
      >
      <Text
        className='text-primary-800 dark:text-background-400 text-sm'
        >
        Already have an account?
      </Text>
      <Link onPress={() => navigation.navigate('SignIn')}>
        <LinkText  className='text-sm'>Sign In</LinkText>
      </Link>
    </HStack>
  );
}
function ResendLink() {
  return (
    <HStack className='py-8'>
      <Text
        className='text-primary-800 dark:text-background-400 text-sm'
        >
        Didn't receive the OTP?{' '}
      </Text>
      <Link href="">
        <LinkText className='text-sm'>RESEND OTP</LinkText>
      </Link>
    </HStack>
  );
}

const OTPSchema = z.object({
  OTP: z.string().min(6, 'OTP must be at least 6 characters in length'),
});

type OTPSchemaType = z.infer<typeof OTPSchema>;

export default function OtpVerification() {
  const {
    formState: {errors},
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
  const [validationError, setValidationError] = useState<string | null>(null);

  // const toast = useToast();
  const navigation = useNavigation();

  const onSubmit = () => {
    // toast.show({
    //   placement: 'bottom right',
    //   render: ({id}) => {
    //     const pinValues = refList.map(ref => ref?.current?.value);
    //     const pin = pinValues.join('');
    //     const Count = otpInput.filter(value => value !== '').length;

    //     if (Count < 6) {
    //       setValidationError('OTP must be at least 6 characters in length');
    //       return;
    //     }

    //     // implement navigation logic here
    //     //@ts-ignore
    //     navigation.navigate('CreatePassword');
    //     setValidationError(null);

    //     return (
    //       <Toast nativeID={id} variant="accent" action="success">
    //         <ToastTitle>OTP sent successfully</ToastTitle>
    //       </Toast>
    //     );
    //   },
    // });
    reset();
  };

  return (
    <GuestLayout>
      <Box className="md:hidden flex">
        <Header />
      </Box>
      <Box className="md:flex hidden flex-1">
        <SideContainerWeb />
      </Box>
      <Box
        className="bg-background-0
            dark:bg-background-50 md:p-8 py-8 px-4 flex-1 max-w-508">
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
              <Text className="text-sm text-error-700">{validationError}</Text>
            )}
            <FormControlHelperText className="mt-8">
              <ResendLink />
            </FormControlHelperText>

            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} size="md" />
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
            onPress={() => onSubmit()}>
            <ButtonText className="text-sm">PROCEED </ButtonText>
          </Button>
        </VStack>
        <AccountLink />
      </Box>
    </GuestLayout>
  );
}
