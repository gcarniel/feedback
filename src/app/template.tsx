export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto bg-slate-800 h-screen p-24">
      <header>header</header>
      {children}
    </div>
  )
}
