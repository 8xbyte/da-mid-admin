import React from 'react'

import * as styles from './text.module.scss'

interface IProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
    > {}

const Text: React.FC<IProps> = ({ className, children, ...others }) => {
    return (
        <span className={[styles.defaultText, className].join(' ')} {...others}>
            {children}
        </span>
    )
}

export default Text
