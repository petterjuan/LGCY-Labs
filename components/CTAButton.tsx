import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "outline";
};

export default function CTAButton({ children, href, variant = "solid" }: Props) {
  const base = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg";
  if (variant === "solid")
    return (
      <Link href={href} className={`${base} bg-accent text-blue-900 hover:bg-yellow-400 shadow-md`}>
        {children}
      </Link>
    );
  return (
    <Link
      href={href}
      className={`${base} border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 hover:border-white`}
    >
      {children}
    </Link>
  );
}
