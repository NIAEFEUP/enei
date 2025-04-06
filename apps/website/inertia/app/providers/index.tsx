import { Provider as JotaiProvider } from "jotai/react";
import { TuyauProvider } from "./tuyau";
import { NotificationProvider } from "~/components/notifications";
import ToastNotificationsProvider from "./notification";

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ToastNotificationsProvider>
      <TuyauProvider>
        <JotaiProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </JotaiProvider>
      </TuyauProvider>
    </ToastNotificationsProvider>
  );
}
