import { useColorScheme } from "nativewind";
import { GluestackUIProvider } from "../components/gluestack-ui-provider";
import React from 'react'

export const Provider = ({children}) => {
  const {colorScheme}=useColorScheme()
  return (
    <GluestackUIProvider mode={colorScheme}>
        {children}
    </GluestackUIProvider>
  )
}
