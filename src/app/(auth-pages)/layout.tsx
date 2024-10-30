export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex w-full max-w-xl">{children}</div>;
}
