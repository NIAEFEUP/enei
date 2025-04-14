import { Provider as JotaiProvider } from "jotai/react";
import { TuyauProvider } from "./tuyau";
import { NotificationProvider } from "~/components/notifications";
import { TooltipProvider } from "~/components/ui/tooltip";

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <TuyauProvider>
      <JotaiProvider>
        <NotificationProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </NotificationProvider>
      </JotaiProvider>
    </TuyauProvider>
  );
}
