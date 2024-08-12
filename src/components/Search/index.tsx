import SearchImage from '@/assets/search.svg'
import Image from '@/components/Image'
import ShadowBlock from '@/components/ShadowBlock'
import React from 'react'

import Input, { IInputProps } from '@/components/Input'

import * as styles from './search.module.scss'

export interface ISearchProps extends IInputProps {}

const Search: React.FC<ISearchProps> = ({ ...others }) => {
    return (
        <ShadowBlock className={styles.search}>
            <Input className={styles.input} {...others} />
            <Image className={styles.image} src={SearchImage} />
        </ShadowBlock>
    )
}

export default Search
