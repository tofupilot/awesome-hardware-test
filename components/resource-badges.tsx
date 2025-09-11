import { Badge } from "@/components/ui/badge";
import { HardwareTestResource } from "@/lib/hardware-data";

interface ResourceBadgesProps {
  resource: HardwareTestResource;
  className?: string;
}

export function ResourceBadges({ resource, className = "" }: ResourceBadgesProps) {
  return (
    <div className={`flex gap-2 flex-wrap ${className}`}>
      {resource.language && (
        <Badge
          variant="outline"
          className={`${resource.unmaintained ? 'border-red-500/30 text-red-400' : 'border-green-500/30 text-green-400'} text-xs font-mono rounded-none bg-transparent`}
        >
          {resource.language.toUpperCase()}
        </Badge>
      )}
      <Badge
        variant="secondary"
        className="bg-zinc-700/70 text-zinc-300 text-xs font-mono rounded-none"
      >
        {resource.category.replace(" ", "_").toUpperCase()}
      </Badge>
    </div>
  );
}