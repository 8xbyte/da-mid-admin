import React from 'react'
import Block from '@/components/Block'
import Image from '@/components/Image'
import SearchImage from '@/assets/search.svg'

import Input, { IInputProps } from '@/components/Input'

import * as styles from './search.module.scss'

export interface ISearchProps extends IInputProps {}

const Search: React.FC<ISearchProps> = ({ ...others }) => {
    return (
        <Block className={styles.search}>
            <Input className={styles.input} {...others} />
            <Image className={styles.image} src={SearchImage} />
        </Block>
    )
}

export default Search
