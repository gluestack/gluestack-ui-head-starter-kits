// "use client";
import React from "react";
import { GluestackUIProvider as NativewindUIProvider} from "@/components/gluestack-ui-provider";
import { useColorScheme } from "nativewind";
import { Pressable } from "@/components/pressable";
import { VStack } from "@/components/vstack";
import { Icon } from "@/components/icon";
import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react-native";

export function Providers({ children }: { children: React.ReactNode }) {
  const {colorScheme,toggleColorScheme}=useColorScheme()
  return (
    <NativewindUIProvider mode={colorScheme}>
      {/* <VStack className="w-full items-end">
        <Pressable onPress={toggleColorScheme} className="bg-blue-500 rounded-full p-2 md:p-4 absolute z-10 right-4 top-4">
          <Icon size="md" as={colorScheme==='dark'?ToggleRightIcon:ToggleLeftIcon} className='text-background-0 dark:text-background-950'  />
        </Pressable> */}
        {children}
      {/* </VStack> */}
    </NativewindUIProvider>
  );
}
