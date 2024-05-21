import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import {Box} from '../../components/box';
import {VStack} from '../../components/vstack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components/button';
import {Icon} from '../../components/icon';
import { useColorScheme } from 'nativewind';
import {ToggleLeftIcon, ToggleRightIcon} from 'lucide-react-native';

type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout(props: GuestLayoutProps) {
  // const {colorScheme, toggleColorScheme} = useColorScheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Box className="h-full web:h-[100vh] web:overflow-hidden ">
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
            bounces={false}
            className="flex-1 bg-background-950 dark:bg-background-0">
            {/* <Button
              onPress={toggleColorScheme}
              className="bg-blue-500 rounded-full p-2 md:p-4 absolute z-10 right-4 top-4">
              <Icon
                size="md"
                as={colorScheme === 'dark' ? ToggleRightIcon : ToggleLeftIcon}
                className="text-background-0 dark:text-background-950"
              />
            </Button> */}
            <VStack className="w-full flex-1 overflow-hidden md:max-w-[740px] md:flex-row md:rounded-xl md:flex-none">
              {props.children}
            </VStack>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
