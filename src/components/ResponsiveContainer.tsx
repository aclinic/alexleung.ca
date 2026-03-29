import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerVariant = "content" | "wide" | "prose";

type ResponsiveContainerProps<T extends ElementType = "div"> = {
  element?: T;
  children: ReactNode;
  className?: string;
  variant?: ContainerVariant;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

const variantClasses: Record<ContainerVariant, string> = {
  content: "section-center",
  wide: "container mx-auto px-5",
  prose: "container mx-auto max-w-3xl px-5",
};

export function ResponsiveContainer<T extends ElementType = "div">({
  element,
  children,
  className = "",
  variant = "content",
  ...rest
}: ResponsiveContainerProps<T>) {
  const Component = element ?? "div";

  return (
    <Component
      {...rest}
      className={`${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
