import { Link } from 'react-router-dom'

interface CTAButtonProps {
  children: React.ReactNode
  to?: string
  onClick?: () => void
  variant?: 'default' | 'light' | 'filled'
  size?: 'default' | 'small'
  className?: string
  type?: 'button' | 'submit'
  fullWidth?: boolean
}

export default function CTAButton({
  children,
  to,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  type = 'button',
  fullWidth = false,
}: CTAButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center uppercase tracking-widest transition-all duration-400 no-underline font-normal'

  const sizeStyles =
    size === 'small'
      ? 'px-5 py-2 text-[11px]'
      : 'px-9 py-3.5 text-xs'

  const variantStyles = {
    default: `border border-[var(--lake-blue)] text-[var(--lake-blue)] bg-transparent hover:bg-[var(--lake-blue)] hover:text-white`,
    light: `border border-[var(--cloud-white)] text-[var(--cloud-white)] bg-transparent hover:bg-[var(--cloud-white)] hover:text-[var(--deep-midnight)]`,
    filled: `border border-[var(--lake-blue)] bg-[var(--lake-blue)] text-[var(--cloud-white)] hover:bg-[var(--light-beach)] hover:border-[var(--light-beach)]`,
  }

  const allStyles = `${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (to) {
    return (
      <Link to={to} className={allStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={allStyles}>
      {children}
    </button>
  )
}
