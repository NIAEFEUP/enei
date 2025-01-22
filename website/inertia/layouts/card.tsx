export default function CardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full mt-24">
      <div className="flex flex-col gap-6 max-w-sm px-4">{children}</div>
    </div>
  )
}
