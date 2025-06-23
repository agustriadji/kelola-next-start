"use client"

import { Select } from "./select"
import { cn } from "@/utils/clsxCn"
import { Label } from "@radix-ui/react-label"
import { AlertTriangle } from "lucide-react"

type Option = {
  label: string
  value: string
  disabled?: boolean
}

type FormSelectProps = {
  label?: string
  name?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  options: Option[]
  onChange?: (value: string) => void
  error?: string
  description?: string
  className?: string
  disabled?: boolean
}

export function FormSelect({
  label,
  name,
  placeholder = "Select...",
  value,
  defaultValue,
  options,
  onChange,
  error,
  description,
  className,
  disabled,
}: FormSelectProps) {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <Label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Label>
      )}

      <Select.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
      >
        <Select.Trigger
          className={cn(
            "w-full",
            error
              ? "border-red-500 ring-red-500 focus:ring-red-500"
              : "focus:ring-blue-500",
          )}
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

        <Select.Content>
          {options.map((opt) => (
            <Select.Item
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      {description && !error && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {error && (
        <p className="flex items-center gap-1 text-sm text-red-600">
          <AlertTriangle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
}
