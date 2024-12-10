import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react"

export function ScrollToTop({
  minHeight, // Height from which button will be visible
  scrollTo, // Height to go on scroll to top
  className,
  ...props
}: ButtonProps & { minHeight?: number; scrollTo?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(document.documentElement.scrollTop >= (minHeight ?? 0));
    };

    onScroll();
    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [minHeight]);

  return (
    <>
      {visible && (
        <Button
          className={cn("fixed rounded-full", className)}
          size="icon"
          onClick={() =>
            window.scrollTo({
              top: scrollTo ?? 0,
              behavior: "smooth",
            })
          }
          {...props}
        >
          <ChevronUp strokeWidth={3} />
        </Button>
      )}
    </>
  );
}
