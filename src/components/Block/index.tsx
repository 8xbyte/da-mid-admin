import React from 'react'
import * as styles from './block.module.scss'

interface IProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {}

const Block: React.FC<IProps> = ({ className, children, ...others }) => {
    return (
        <div className={[styles.defaultBlock, className].join(' ')} {...others}>
            {children}
        </div>
    )
}

export default Block
