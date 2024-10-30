import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  parent: ResolvingMetadata,
):Promise<Metadata> {
  return {
    title:"TODO-IT"
  };
}
export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex w-full max-w-xl">{children}</div>;
}
