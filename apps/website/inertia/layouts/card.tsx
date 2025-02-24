export default function CardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-24 flex w-full items-center justify-center">
      <div className="flex max-w-sm flex-col gap-6 px-4">{children}</div>
    </div>
  );
}
