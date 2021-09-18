export const BaseIcon = ({ color, pushRight = true, width = 38, height = 38, children }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width={width}
        height={height}
        viewBox='0 0 24 24'
        fill='none'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ marginRight: pushRight ? '20px' : '0', minWidth: 24 }}
    >
        {children}
    </svg>
);

export const CloseIcon = () => (
    <BaseIcon color='#FFFFFF' pushRight={false} width={25} height={25}>
        <line x1='18' y1='6' x2='6' y2='18' />
        <line x1='6' y1='6' x2='18' y2='18' />
    </BaseIcon>
);

export const ErrorIcon = () => (
    <BaseIcon color='#FF0040'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='8' x2='12' y2='12' />
        <line x1='12' y1='16' x2='12' y2='16' />
    </BaseIcon>
);

export const InfoIcon = () => (
    <BaseIcon color='#2E9AFE'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='16' x2='12' y2='12' />
        <line x1='12' y1='8' x2='12' y2='8' />
    </BaseIcon>
);

export const SuccessIcon = () => (
    <BaseIcon color='#31B404'>
        <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
        <polyline points='22 4 12 14.01 9 11.01' />
    </BaseIcon>
);