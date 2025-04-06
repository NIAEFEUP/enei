import { Provider as JotaiProvider } from "jotai/react";
import { TuyauProvider } from "./tuyau";
import { NotificationProvider } from "~/components/notifications";
import FlashErrorsProvider from "./notification";

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <FlashErrorsProvider>
      <TuyauProvider>
        <JotaiProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </JotaiProvider>
      </TuyauProvider>
    </FlashErrorsProvider>
  );
}
