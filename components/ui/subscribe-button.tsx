import Link from "next/link";

const SubscribeButton = () => {
  return (
    <Link
      href="/subscribe"
      className="
        hidden md:inline-flex
        items-center
        border
        border-blue-500/40
        px-4
        py-2
        text-xs
        tracking-widest
        uppercase
        text-blue-400
        hover:text-blue-300
        hover:border-blue-400/70
        hover:bg-blue-500/10
        transition-colors
      "
    >
      Subscribe
    </Link>
  );
};

export default SubscribeButton;
