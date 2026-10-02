import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  /** Stretch to the container width below the `sm` breakpoint. */
  fullWidthOnMobile?: boolean
  className?: string
  children: ReactNode
}

type LinkButtonProps = BaseProps & { to: string }
type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { to?: undefined }

export type ButtonProps = LinkButtonProps | NativeButtonProps

const BASE =
  'btn-sheen group relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap border font-sans font-semibold uppercase transition-[background-color,border-color,box-shadow,transform,opacity] duration-200 ease-out active:translate-y-px disabled:opacity-70'

const VARIANTS: Record<Variant, string> = {
  primary:
    'border-white/20 bg-linear-to-b from-azure to-royal text-white shadow-[0_10px_30px_-14px_rgba(25,118,210,0.9)] hover:border-white/40 hover:shadow-[0_0_0_1px_rgba(111,177,242,0.35),0_14px_44px_-10px_rgba(25,118,210,0.85)] disabled:hover:border-white/20',
  secondary:
    'border-white/20 bg-white/[0.03] text-white hover:border-sky/60 hover:bg-white/[0.07] hover:shadow-[0_0_36px_-12px_rgba(25,118,210,0.9)]',
}

const SIZES: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.6875rem] tracking-[0.2em]',
  lg: 'h-14 px-8 text-xs tracking-[0.22em]',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'lg', fullWidthOnMobile, className, children } = props
  const classes = [
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidthOnMobile ? 'w-full sm:w-auto' : '',
    className ?? '',
  ].join(' ')

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  const {
    variant: _variant,
    size: _size,
    fullWidthOnMobile: _fullWidth,
    className: _className,
    children: _children,
    to: _to,
    type = 'button',
    ...rest
  } = props

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
