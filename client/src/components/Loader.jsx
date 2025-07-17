import { Loader2 } from 'lucide-react';
import Spinner  from '@/components/ui/spinner'; // Requires: pnpm dlx shadcn-ui@latest add spinner

const Loader = ({
  message = 'Loading...',
  center = true,
  type = 'lucide', // or 'shadcn'
  size = 20,
}) => {
  return (
    <div
      className={`flex items-center gap-2 text-muted-foreground ${
        center ? 'justify-center py-6' : ''
      }`}
    >
      {type === 'shadcn' ? (
        <Spinner className={`w-[${size}px] h-[${size}px] text-muted-foreground`} />
      ) : (
        <Loader2 className={`animate-spin w-[${size}px] h-[${size}px]`} />
      )}
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Loader;