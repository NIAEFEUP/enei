import { Tailwind as EmailTailwind } from "@react-email/components";

export const Tailwind = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmailTailwind
      config={{
        theme: {
          extend: {
            colors: {
              primary: { DEFAULT: "#0B4F6C", foreground: "#EFE3CA" },
              secondary: { DEFAULT: "#EFE3CA", foreground: "#0B4F6C" },
            },
          },
        },
      }}
    >
      {children}
    </EmailTailwind>
  );
};
