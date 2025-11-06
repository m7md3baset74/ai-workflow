'use client';

import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  text?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
};

export function Loader({ 
  size = 'md', 
  className, 
  showText = false, 
  text = 'Loading...' 
}: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      {/* Spinning gradient ring */}
      <div className="relative">
        <div 
          className={cn(
            'animate-gradient-spin rounded-full border-4 border-transparent theme-gradient p-1 shadow-lg',
            sizeClasses[size]
          )}
        >
          <div className={cn(
            'rounded-full bg-background',
            sizeClasses[size]
          )} />
        </div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 animate-pulse-glow rounded-full theme-gradient" />
        </div>
        
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full theme-gradient opacity-20 blur-xl animate-pulse" />
      </div>
      
      {showText && (
        <p className={cn(
          'mt-4 font-medium text-muted-foreground animate-pulse',
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  );
}

export function PageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader size="xl" />
        <div className="space-y-3">
          <p className="text-lg font-medium text-foreground animate-pulse">
            {text}
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="h-1.5 w-1.5 theme-primary rounded-full animate-bounce-sequence [animation-delay:-0.3s]" style={{backgroundColor: 'var(--theme-primary)'}}></div>
            <div className="h-1.5 w-1.5 theme-secondary rounded-full animate-bounce-sequence [animation-delay:-0.15s]" style={{backgroundColor: 'var(--theme-secondary)'}}></div>
            <div className="h-1.5 w-1.5 theme-accent rounded-full animate-bounce-sequence" style={{backgroundColor: 'var(--theme-accent)'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InlineLoader({ 
  text = 'Processing...', 
  size = 'sm' 
}: { 
  text?: string; 
  size?: 'sm' | 'md' 
}) {
  return (
    <div className="flex items-center space-x-2">
      <Loader size={size} />
      <span className={cn(
        'font-medium text-muted-foreground',
        textSizeClasses[size]
      )}>
        {text}
      </span>
    </div>
  );
}