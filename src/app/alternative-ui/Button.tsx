'use client';

type ButtonProps = {
  variant?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
};

export default function Button({ variant, label, onClick, disabled, color }: ButtonProps) {
  const backgroundColor = disabled
    ? '#aaa'
    : variant === 'primary'
      ? '#0070f3'
      : variant === 'danger' || color === 'error'
        ? '#d9534f'
        : '#ccc';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        margin: '4px',
        borderRadius: '6px',
        backgroundColor,
        color: '#fff',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
}
