import { router } from "@inertiajs/react";
import { useEffect } from "react";
import { useToast } from "~/hooks/use_toast";
import type { SharedProps } from "@adonisjs/inertia/types";

export default function NotificationsProvider({ children }: { children?: React.ReactNode }) {
  const { toast } = useToast();

  useEffect(() => {
    return router.on("success", (ev) => {
      const notifications = ev.detail.page.props.notifications as SharedProps["notifications"];

      if (!notifications?.length) return;

      notifications.forEach((notification) => {
        toast({
          title: notification.title,
          description: notification.description,
          variant: notification.variant,
          duration: notification.duration,
        });
      });
    });
  }, []);

  return children;
}
