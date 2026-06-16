export default function BlogAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-var(--navbar-height,4rem))] overflow-hidden">
      {children}
    </div>
  );
}
