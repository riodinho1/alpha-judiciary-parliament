import { memo, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { FieldName, SelectField } from '../data/caseReview'
import { FieldFrame, controlClasses, fieldIds } from './FieldFrame'

interface CustomSelectProps {
  id: string
  field: SelectField
  value: string
  error?: string
  disabled?: boolean
  onChange: (name: FieldName, value: string) => void
  onBlur: (name: FieldName) => void
}

/**
 * Select-only combobox following the WAI-ARIA authoring pattern: focus stays
 * on the trigger and the highlighted option is exposed via aria-activedescendant.
 *
 * Memoised so that typing in the text fields does not re-render the dropdowns.
 */
export const CustomSelect = memo(function CustomSelect({
  id,
  field,
  value,
  error,
  disabled,
  onChange,
  onBlur,
}: CustomSelectProps) {
  const { options } = field
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const typeahead = useRef({ query: '', timer: 0 })
  const ids = fieldIds(id)
  const listboxId = `${id}-listbox`
  const optionId = (index: number) => `${id}-option-${index}`
  const Icon = field.icon
  const describedBy = error ? ids.error : field.hint ? ids.hint : undefined

  useEffect(() => {
    if (disabled) setOpen(false)
  }, [disabled])

  const openList = (index?: number) => {
    const selected = options.indexOf(value)
    setActiveIndex(index ?? (selected >= 0 ? selected : 0))
    setOpen(true)
  }

  const select = (index: number) => {
    onChange(field.name, options[index])
    setOpen(false)
  }

  const handleTypeahead = (character: string) => {
    const state = typeahead.current
    window.clearTimeout(state.timer)
    state.query += character.toLowerCase()
    state.timer = window.setTimeout(() => (state.query = ''), 600)

    const match = options.findIndex((option) => option.toLowerCase().startsWith(state.query))
    if (match < 0) return
    if (open) setActiveIndex(match)
    else openList(match)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1

    if (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      handleTypeahead(event.key)
      return
    }

    if (!open) {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'Enter':
        case ' ':
          event.preventDefault()
          openList()
          break
        case 'Home':
          event.preventDefault()
          openList(0)
          break
        case 'End':
          event.preventDefault()
          openList(last)
          break
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((index) => Math.min(last, index + 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((index) => Math.max(0, index - 1))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(last)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        select(activeIndex)
        break
      case 'Escape':
        event.preventDefault()
        // Keep Escape from reaching anything behind the list.
        event.stopPropagation()
        setOpen(false)
        break
      case 'Tab':
        select(activeIndex)
        break
    }
  }

  return (
    <FieldFrame
      controlId={id}
      index={field.index}
      label={field.label}
      hint={field.hint}
      error={error}
      valid={value !== ''}
    >
      <div className="group relative">
        <Icon
          aria-hidden
          strokeWidth={1.5}
          className={`pointer-events-none absolute top-1/2 left-4 z-10 size-[1.125rem] -translate-y-1/2 transition-colors duration-300 group-focus-within:text-sky ${
            error ? 'text-alert' : 'text-muted'
          }`}
        />

        <button
          id={id}
          type="button"
          role="combobox"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={`${ids.label} ${id}-value`}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          aria-required
          aria-activedescendant={open ? optionId(activeIndex) : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          onBlur={() => {
            setOpen(false)
            onBlur(field.name)
          }}
          className={`peer ${controlClasses(Boolean(error))} flex items-center pr-12 pl-12 text-left ${
            open ? 'border-azure bg-navy-950' : ''
          }`}
        >
          <span id={`${id}-value`} className={`min-w-0 truncate ${value ? 'text-white' : 'text-muted/80'}`}>
            {value || field.placeholder}
          </span>
        </button>

        <ChevronDown
          aria-hidden
          strokeWidth={1.5}
          className={`pointer-events-none absolute top-1/2 right-4 size-[1.125rem] -translate-y-1/2 text-muted transition-transform duration-300 group-focus-within:text-sky ${
            open ? 'rotate-180' : ''
          }`}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-sky transition-transform duration-500 ease-expo peer-focus-visible:scale-x-100"
        />

        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={ids.label}
          hidden={!open}
          // Keep focus on the trigger when an option is pressed.
          onMouseDown={(event) => event.preventDefault()}
          className="listbox-enter absolute inset-x-0 top-[calc(100%+0.375rem)] z-30 border border-sky/40 bg-navy-950 py-1.5 shadow-[0_30px_60px_-20px_rgba(2,8,18,0.95),0_0_40px_-18px_rgba(25,118,210,0.9)]"
        >
          {options.map((option, index) => {
            const selected = option === value
            const active = index === activeIndex
            return (
              <li
                key={option}
                id={optionId(index)}
                role="option"
                aria-selected={selected}
                onClick={() => select(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm transition-colors duration-150 ${
                  active ? 'bg-azure/20 text-white' : 'text-mist'
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-0.5 bg-sky transition-opacity duration-150 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {option}
                {selected && <Check aria-hidden className="size-4 shrink-0 text-sky" strokeWidth={2} />}
              </li>
            )
          })}
        </ul>
      </div>
    </FieldFrame>
  )
})
