'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: 'group toast group-[.toaster]:bg-card/95 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-card-foreground group-[.toaster]:border-2 group-[.toaster]:border-white/20 group-[.toaster]:shadow-[0_25px_80px_rgba(0,0,0,0.6)] group-[.toaster]:rounded-lg',
          description: 'group-[.toast]:text-muted-foreground group-[.toast]:text-sm',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-semibold group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:rounded-md group-[.toast]:hover:opacity-90 group-[.toast]:transition-all',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton: 'group-[.toast]:bg-white/10 group-[.toast]:border-white/20 group-[.toast]:hover:bg-white/20',
          error: 'group-[.toaster]:bg-destructive/95 group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive/30',
          success: 'group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-[#c264c8] group-[.toaster]:to-[#5643b6] group-[.toaster]:text-white group-[.toaster]:border-white/30 group-[.toaster]:shadow-[0_0_30px_rgba(194,100,200,0.4)]',
          warning: 'group-[.toaster]:bg-yellow-500/95 group-[.toaster]:text-white',
          info: 'group-[.toaster]:bg-blue-500/95 group-[.toaster]:text-white',
        },
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
