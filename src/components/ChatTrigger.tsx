import { ChevronLeft } from "lucide-react";

export default function ChatTrigger() {
    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group">
            <div
                className="
          flex items-center gap-2 
          bg-primary/90 text-primary-foreground 
          py-3 px-3 
          rounded-l-full 
          shadow-[0_4px_12px_rgba(255,138,0,0.3)] 
          cursor-pointer 
          transition-all duration-300 ease-out 
          translate-x-[calc(100%-40px)] 
          group-hover:translate-x-0 
          hover:pr-6
        "
            >
                <ChevronLeft size={20} className="stroke-[3]" />
                <span
                    className="
            font-mono font-bold text-sm whitespace-nowrap 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-200 delay-75
          "
                >
                    Ask me
                </span>
            </div>
        </div>
    );
}
