import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
   <textarea
  data-slot="textarea"
  className={cn(
    // 🔹 Base layout
    "flex min-h-16 w-full resize-none bg-transparent text-base md:text-sm",
    
    // 🔹 Remove all visual borders / outlines
    "border-0 outline-none ring-0 focus-visible:ring-0 focus-visible:border-0",
    
    // 🔹 Placeholder subtle and modern
    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
    
    // 🔹 Disable background / shadow / border completely
    "shadow-none focus:shadow-none focus-visible:shadow-none",
    
    // 🔹 Disabled state handled gently
    "disabled:cursor-not-allowed disabled:opacity-50",
    
    className
  )}
  {...props}
/>

  );
}

export { Textarea }
