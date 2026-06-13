export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";
}

export function isAdminEmail(email?: string | null): boolean {
  const adminEmail = getAdminEmail();
  return !!email && !!adminEmail && email === adminEmail;
}
