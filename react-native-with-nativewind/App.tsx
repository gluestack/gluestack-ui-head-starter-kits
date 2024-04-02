import './global.css';
import React from 'react';
import LoginNav from './src/navigation/LoginNav';
import { GluestackUIProvider as NativewindUIProvider} from './components/gluestack-ui-provider';
import { useColorScheme } from 'nativewind';

export default function App() {  
  const {colorScheme}=useColorScheme()
  return (
      <NativewindUIProvider mode={colorScheme}>
        <LoginNav />
      </NativewindUIProvider>
  );
}
