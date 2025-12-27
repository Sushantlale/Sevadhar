import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
// Note: You will need to move your Context files from Lovable to MyMobileApp later
// For now, I'm commenting them out so the app doesn't crash
// import { LanguageProvider } from "../contexts/LanguageContext"; 

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* We use Stack to allow 'back' button navigation between screens */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup/customer" />
      </Stack>
    </QueryClientProvider>
  );
}