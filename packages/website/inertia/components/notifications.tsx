import { createContext, useCallback, ReactNode, Key, useContext, useState } from "react";
import { createPortal } from "react-dom";

type NotificationRenderFunction = (children: ReactNode, key?: Key) => React.ReactPortal | undefined;

const NotificationContext = createContext<{
  setContainer: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  render: NotificationRenderFunction;
} | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const render: NotificationRenderFunction = useCallback(
    (notification, key) => {
      if (!container) return;
      return createPortal(notification, container, key);
    },
    [container],
  );

  return (
    <div>
      <NotificationContext.Provider value={{ setContainer, render }}>
        {children}
      </NotificationContext.Provider>
    </div>
  );
}

export function NotificationContainer(props: { className?: string }) {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("NotificationContainer must be used within a NotificationProvider");

  return <div ref={(el) => context.setContainer(el)} {...props} />;
}

export function Notification({ children, key }: { children: React.ReactNode; key?: Key }) {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("Notification must be used within a NotificationProvider");

  return context.render(<div>{children}</div>, key);
}
