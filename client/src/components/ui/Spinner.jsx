import { Loader2 } from "lucide-react";

const Spinner = ({ size = 24 }) => (
  <Loader2
    className="animate-spin text-primary"
    size={size}
    strokeWidth={2.5}
  />
);

export default Spinner;