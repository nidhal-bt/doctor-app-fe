export default async function DrLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>doctor layout</div>
      {children}
    </div>
  );
}