import { LoaderIcon } from "lucide-react"
import { Loader2Icon } from "lucide-react"
import { cn } from "../../../lib/utils";



function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
    role="status"
    aria-label="Loading"
    className={cn("animate-spin", className)}
    {...props}
    />
  )
}


export function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}


export { Spinner }