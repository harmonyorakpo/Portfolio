import { Link, type LinkProps } from "react-router-dom";
import { useApp } from "../../app/context";

type Props = Omit<LinkProps, "to"> & { to: string; label?: string };

export default function TransitionLink({ to, label, onClick, ...rest }: Props) {
  const { go } = useApp();
  return (
    <Link
      to={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        go(to, label);
      }}
      {...rest}
    />
  );
}
