import React from 'react';
import { Box  } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { ScrollView , StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { ToggleLeftIcon, ToggleRightIcon } from 'lucide-react-native';
type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout(props: GuestLayoutProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="h-full web:h-[100vh] overflow-hidden">
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
            }}
            className="flex-1 bg-background-950
            dark:bg-background-0 md:bg-background-800 md:dark:bg-background-100"
            bounces={false}
          >
           
        {/* <Pressable
          onPress={toggleColorScheme}
          className="bg-blue-500 rounded-full p-2 md:p-4 absolute z-10 right-4 top-4"
        >
          <Icon
            size="md"
            as={colorScheme === 'dark' ? ToggleRightIcon : ToggleLeftIcon}
            className="text-background-0 dark:text-background-950"
          />
        </Pressable> */}
            <VStack className="w-full flex-1 overflow-hidden md:max-w-[740px] md:flex-row md:rounded-xl md:flex-none">
              {props.children}
            </VStack>
          </ScrollView>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
