import React from 'react'

import * as styles from './input.module.scss'

export interface IInputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

const Input: React.FC<IInputProps> = ({ className, ...others }) => {
    return (
        <input
            className={[styles.defaultInput, className].join(' ')}
            {...others}
        />
    )
}

export default Input
