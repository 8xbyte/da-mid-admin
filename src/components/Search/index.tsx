import React from 'react'
import Block from '@/components/Block'

import Input, { IInputProps } from '@/components/Input'

import * as styles from './search.module.scss'

export interface ISearchProps extends IInputProps {}

const Search: React.FC<ISearchProps> = ({ ...others }) => {
    return (
        <Block className={styles.search}>
            <Input className={styles.input} {...others} />
        </Block>
    )
}

export default Search
