import { Stethoscope } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Stethoscope className="size-4" />
      </div>
      <span className="text-sm font-semibold">DoctorApp</span>
    </Link>
  )
}
