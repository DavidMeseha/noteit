export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex max-w-xl mx-auto w-full">{children}</div>;
}
