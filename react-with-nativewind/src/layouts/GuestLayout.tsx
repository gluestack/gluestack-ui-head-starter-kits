import React from "react";
import { Box } from "../components/box";
import { VStack } from "../components/vstack";
import { ScrollView, StatusBar } from "react-native";

type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout(props: GuestLayoutProps) {
  return (
    <Box className="h-full web:h-[100vh] overflow-hidden">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
        className="flex-1 bg-background-950
            dark:bg-background-0 md:bg-background-800 md:dark:bg-background-100"
        bounces={false}
      >
        <VStack className="w-full flex-1 overflow-hidden md:max-w-containerWidth md:flex-row md:rounded-xl md:flex-none">
          {props.children}
        </VStack>
      </ScrollView>
    </Box>
  );
}
