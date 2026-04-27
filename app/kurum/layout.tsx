import { KurumShell } from "@/components/kurum/kurum-shell";

/**
 * Kurum panel layout, Pass 3.
 *
 * App-UI register, no marketing motion. Distinct sidebar nav config + kurum
 * session reader.
 */
export default function KurumLayout({ children }: { children: React.ReactNode }) {
  return <KurumShell>{children}</KurumShell>;
}
