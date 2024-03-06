'use client'

import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FormSubmitProps {
	children: React.ReactNode
	disabled?: boolean
	className?: string
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| 'primary'
	size?: 'default' | 'sm' | 'lg' | 'icon' | 'inline'
}

export const FormSubmit = ({
	children,
	disabled,
	className,
	variant,
	size,
}: FormSubmitProps) => {
	const { pending } = useFormStatus()

	return (
		<Button
			disabled={pending || disabled}
			type='submit'
			variant={variant}
			size={size}
			className={cn(className)}>
			{children}
		</Button>
	)
}
