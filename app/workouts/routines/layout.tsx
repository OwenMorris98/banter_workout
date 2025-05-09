export default function RoutinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold">Routines</h1>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
