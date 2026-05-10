import {
  Eye,
  EyeOff,
  Loader2,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  type LucideProps,
} from "lucide-react";

export type Icon = (props: LucideProps) => React.ReactElement;

export const Icons = {
  view: Eye,
  hide: EyeOff,
  spinner: Loader2,
  sun: Sun,
  moon: Moon,
  monitor: Monitor,
  chevronDown: ChevronDown,
  check: Check,
  close: X,
  warning: AlertCircle,
} as const;
