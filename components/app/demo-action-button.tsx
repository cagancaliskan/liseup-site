"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";

interface DemoActionButtonProps extends Omit<ButtonProps, "onClick"> {
  action: string;
  toastType?: "success" | "info";
  beforeToast?: () => void;
}

export const DemoActionButton = React.forwardRef<HTMLButtonElement, DemoActionButtonProps>(
  ({ action, toastType = "success", beforeToast, children, ...rest }, ref) => (
    <Button
      ref={ref}
      {...rest}
      onClick={() => {
        beforeToast?.();
        (toastType === "info" ? toast : toast.success)(action);
      }}
    >
      {children}
    </Button>
  )
);
DemoActionButton.displayName = "DemoActionButton";

interface DemoFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  action: string;
  redirectTo?: string;
  resetOnSuccess?: boolean;
}

export function DemoForm({
  action,
  redirectTo,
  resetOnSuccess,
  children,
  ...rest
}: DemoFormProps) {
  const router = useRouter();
  return (
    <form
      {...rest}
      onSubmit={(e) => {
        e.preventDefault();
        if (resetOnSuccess) (e.currentTarget as HTMLFormElement).reset();
        toast.success(action);
        if (redirectTo) router.push(redirectTo);
      }}
    >
      {children}
    </form>
  );
}
