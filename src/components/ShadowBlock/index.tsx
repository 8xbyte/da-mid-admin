import React from 'react'

import Block, { IBlockProps } from '@/components/Block'

import * as styles from './shadow-block.module.scss'

export interface IShadowBlockProps extends IBlockProps {}

const ShadowBlock: React.FC<IShadowBlockProps> = ({
    className,
    children,
    ...others
}) => {
    return (
        <Block
            className={[styles.shadowBlock, className].join(' ')}
            {...others}
        >
            {children}
        </Block>
    )
}

export default ShadowBlock
