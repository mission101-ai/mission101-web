interface WaveDividerProps {
  variant?: 'gradient' | 'line' | 'dots';
}

export const WaveDivider = ({ variant = 'gradient' }: WaveDividerProps) => {
  if (variant === 'line') {
    return (
      <div className="relative w-full h-px my-8">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex justify-center items-center py-8 gap-2">
        <div className="w-2 h-2 rounded-full bg-uzhhorod/30" />
        <div className="w-2 h-2 rounded-full bg-uzhhorod/50" />
        <div className="w-2 h-2 rounded-full bg-uzhhorod/70" />
        <div className="w-2 h-2 rounded-full bg-uzhhorod/50" />
        <div className="w-2 h-2 rounded-full bg-uzhhorod/30" />
      </div>
    );
  }

  // Default: subtle gradient
  return (
    <div className="relative w-full h-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent" />
    </div>
  );
};
