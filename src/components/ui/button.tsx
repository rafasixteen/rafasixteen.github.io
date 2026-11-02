import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function buttonClassName(className?: string) {
	return cn("button", className);
}

export function ButtonLink({ className, ...props }: ComponentProps<"a">) {
	return <a className={buttonClassName(className)} {...props} />;
}
