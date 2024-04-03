// import { GluestackUIProvider } from '@gluestack-ui/themed'
// import { config } from './gluestack-ui.config'
import { GluestackUIProvider } from "../../../components/gluestack-ui-provider";

export function GluestackUI({ children }: { children: React.ReactNode }) {
  return <GluestackUIProvider mode="light">{children}</GluestackUIProvider>
  // return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>
}
