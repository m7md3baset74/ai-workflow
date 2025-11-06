'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeVariant {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
}

export interface TypographySettings {
  fontFamily: string;
  fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  fontWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface CustomTheme {
  variant: ThemeVariant;
  typography: TypographySettings;
}

interface ThemeCustomizerContextType {
  customTheme: CustomTheme;
  setThemeVariant: (variant: ThemeVariant) => void;
  setTypography: (typography: TypographySettings) => void;
  resetToDefault: () => void;
}

const themeVariants: ThemeVariant[] = [
  {
    id: 'default',
    name: 'WebflowApp Blue',
    colors: {
      primary: 'rgb(37 99 235)', // blue-600
      secondary: 'rgb(147 51 234)', // purple-600
      accent: 'rgb(59 130 246)', // blue-500
      gradient: 'linear-gradient(135deg, rgb(59 130 246), rgb(147 51 234))'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    colors: {
      primary: 'rgb(5 150 105)', // emerald-600
      secondary: 'rgb(34 197 94)', // green-500
      accent: 'rgb(16 185 129)', // emerald-500
      gradient: 'linear-gradient(135deg, rgb(16 185 129), rgb(34 197 94))'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: {
      primary: 'rgb(251 146 60)', // orange-400
      secondary: 'rgb(239 68 68)', // red-500
      accent: 'rgb(245 101 101)', // red-400
      gradient: 'linear-gradient(135deg, rgb(251 146 60), rgb(239 68 68))'
    }
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    colors: {
      primary: 'rgb(14 116 144)', // cyan-700
      secondary: 'rgb(8 145 178)', // cyan-600
      accent: 'rgb(34 211 238)', // cyan-400
      gradient: 'linear-gradient(135deg, rgb(14 116 144), rgb(34 211 238))'
    }
  },
  {
    id: 'rose',
    name: 'Rose Garden',
    colors: {
      primary: 'rgb(225 29 72)', // rose-600
      secondary: 'rgb(236 72 153)', // pink-500
      accent: 'rgb(244 114 182)', // pink-400
      gradient: 'linear-gradient(135deg, rgb(225 29 72), rgb(236 72 153))'
    }
  },
  {
    id: 'amber',
    name: 'Golden Hour',
    colors: {
      primary: 'rgb(217 119 6)', // amber-600
      secondary: 'rgb(245 158 11)', // amber-500
      accent: 'rgb(251 191 36)', // amber-400
      gradient: 'linear-gradient(135deg, rgb(217 119 6), rgb(245 158 11))'
    }
  },
  {
    id: 'violet',
    name: 'Royal Violet',
    colors: {
      primary: 'rgb(139 69 193)', // violet-600
      secondary: 'rgb(168 85 247)', // purple-500
      accent: 'rgb(196 181 253)', // violet-300
      gradient: 'linear-gradient(135deg, rgb(139 69 193), rgb(168 85 247))'
    }
  },
  {
    id: 'indigo',
    name: 'Midnight Indigo',
    colors: {
      primary: 'rgb(79 70 229)', // indigo-600
      secondary: 'rgb(99 102 241)', // indigo-500
      accent: 'rgb(129 140 248)', // indigo-400
      gradient: 'linear-gradient(135deg, rgb(79 70 229), rgb(99 102 241))'
    }
  },
  {
    id: 'teal',
    name: 'Tropical Teal',
    colors: {
      primary: 'rgb(13 148 136)', // teal-600
      secondary: 'rgb(20 184 166)', // teal-500
      accent: 'rgb(45 212 191)', // teal-400
      gradient: 'linear-gradient(135deg, rgb(13 148 136), rgb(20 184 166))'
    }
  },
  {
    id: 'lime',
    name: 'Electric Lime',
    colors: {
      primary: 'rgb(101 163 13)', // lime-600
      secondary: 'rgb(132 204 22)', // lime-500
      accent: 'rgb(163 230 53)', // lime-400
      gradient: 'linear-gradient(135deg, rgb(101 163 13), rgb(132 204 22))'
    }
  },
  {
    id: 'fuchsia',
    name: 'Neon Fuchsia',
    colors: {
      primary: 'rgb(192 38 211)', // fuchsia-600
      secondary: 'rgb(217 70 239)', // fuchsia-500
      accent: 'rgb(240 171 252)', // fuchsia-300
      gradient: 'linear-gradient(135deg, rgb(192 38 211), rgb(217 70 239))'
    }
  },
  {
    id: 'slate',
    name: 'Modern Slate',
    colors: {
      primary: 'rgb(71 85 105)', // slate-600
      secondary: 'rgb(100 116 139)', // slate-500
      accent: 'rgb(148 163 184)', // slate-400
      gradient: 'linear-gradient(135deg, rgb(71 85 105), rgb(100 116 139))'
    }
  },
  {
    id: 'red',
    name: 'Crimson Red',
    colors: {
      primary: 'rgb(220 38 38)', // red-600
      secondary: 'rgb(239 68 68)', // red-500
      accent: 'rgb(248 113 113)', // red-400
      gradient: 'linear-gradient(135deg, rgb(220 38 38), rgb(239 68 68))'
    }
  },
  {
    id: 'yellow',
    name: 'Sunny Yellow',
    colors: {
      primary: 'rgb(202 138 4)', // yellow-600
      secondary: 'rgb(234 179 8)', // yellow-500
      accent: 'rgb(250 204 21)', // yellow-400
      gradient: 'linear-gradient(135deg, rgb(202 138 4), rgb(234 179 8))'
    }
  },
  {
    id: 'pink',
    name: 'Bubblegum Pink',
    colors: {
      primary: 'rgb(219 39 119)', // pink-600
      secondary: 'rgb(236 72 153)', // pink-500
      accent: 'rgb(244 114 182)', // pink-400
      gradient: 'linear-gradient(135deg, rgb(219 39 119), rgb(236 72 153))'
    }
  },
  {
    id: 'sky',
    name: 'Azure Sky',
    colors: {
      primary: 'rgb(2 132 199)', // sky-600
      secondary: 'rgb(14 165 233)', // sky-500
      accent: 'rgb(56 189 248)', // sky-400
      gradient: 'linear-gradient(135deg, rgb(2 132 199), rgb(14 165 233))'
    }
  },
  {
    id: 'neutral',
    name: 'Warm Neutral',
    colors: {
      primary: 'rgb(82 82 82)', // neutral-600
      secondary: 'rgb(115 115 115)', // neutral-500
      accent: 'rgb(163 163 163)', // neutral-400
      gradient: 'linear-gradient(135deg, rgb(82 82 82), rgb(115 115 115))'
    }
  },
  {
    id: 'stone',
    name: 'Earth Stone',
    colors: {
      primary: 'rgb(87 83 78)', // stone-600
      secondary: 'rgb(120 113 108)', // stone-500
      accent: 'rgb(168 162 158)', // stone-400
      gradient: 'linear-gradient(135deg, rgb(87 83 78), rgb(120 113 108))'
    }
  },
  {
    id: 'zinc',
    name: 'Cool Zinc',
    colors: {
      primary: 'rgb(82 82 91)', // zinc-600
      secondary: 'rgb(113 113 122)', // zinc-500
      accent: 'rgb(161 161 170)', // zinc-400
      gradient: 'linear-gradient(135deg, rgb(82 82 91), rgb(113 113 122))'
    }
  },
  {
    id: 'gradient',
    name: 'Rainbow Gradient',
    colors: {
      primary: 'rgb(239 68 68)', // red-500
      secondary: 'rgb(147 51 234)', // purple-600
      accent: 'rgb(59 130 246)', // blue-500
      gradient: 'linear-gradient(135deg, rgb(239 68 68), rgb(245 158 11), rgb(34 197 94), rgb(59 130 246), rgb(147 51 234))'
    }
  }
];

const defaultTypography: TypographySettings = {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontSize: 'base',
  fontWeight: 'normal'
};

const defaultTheme: CustomTheme = {
  variant: themeVariants[0],
  typography: defaultTypography
};

const ThemeCustomizerContext = createContext<ThemeCustomizerContextType | undefined>(undefined);

export function ThemeCustomizerProvider({ children }: { children: React.ReactNode }) {
  const [customTheme, setCustomTheme] = useState<CustomTheme>(defaultTheme);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('webflow-custom-theme');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        setCustomTheme(parsed);
      } catch (error) {
        console.error('Failed to parse saved theme:', error);
        setCustomTheme(defaultTheme);
      }
    } else {
      // Apply default theme on first load
      setCustomTheme(defaultTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('webflow-custom-theme', JSON.stringify(customTheme));
    
    // Apply theme to CSS custom properties
    const root = document.documentElement;
    const { variant, typography } = customTheme;
    
    // Apply color variables
    root.style.setProperty('--theme-primary', variant.colors.primary);
    root.style.setProperty('--theme-secondary', variant.colors.secondary);
    root.style.setProperty('--theme-accent', variant.colors.accent);
    root.style.setProperty('--theme-gradient', variant.colors.gradient);
    
    // Apply typography
    root.style.setProperty('--theme-font-family', typography.fontFamily);
    root.style.setProperty('--theme-font-size', typography.fontSize);
    root.style.setProperty('--theme-font-weight', typography.fontWeight);
    
    // Apply font size classes
    const fontSizeMap = {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px'
    };
    root.style.setProperty('--theme-font-size-value', fontSizeMap[typography.fontSize]);
    
    // Apply font weight
    const fontWeightMap = {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    };
    root.style.setProperty('--theme-font-weight-value', fontWeightMap[typography.fontWeight]);
    
  }, [customTheme]);

  const setThemeVariant = (variant: ThemeVariant) => {
    setCustomTheme(prev => ({ ...prev, variant }));
  };

  const setTypography = (typography: TypographySettings) => {
    setCustomTheme(prev => ({ ...prev, typography }));
  };

  const resetToDefault = () => {
    setCustomTheme(defaultTheme);
    localStorage.removeItem('webflow-custom-theme');
  };

  return (
    <ThemeCustomizerContext.Provider
      value={{
        customTheme,
        setThemeVariant,
        setTypography,
        resetToDefault
      }}
    >
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

export function useThemeCustomizer() {
  const context = useContext(ThemeCustomizerContext);
  if (context === undefined) {
    throw new Error('useThemeCustomizer must be used within a ThemeCustomizerProvider');
  }
  return context;
}

export { themeVariants };