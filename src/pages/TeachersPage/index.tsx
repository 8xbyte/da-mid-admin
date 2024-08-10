import React from 'react'
import Block from '@/components/Block'
import Search from '@/components/Search'

import * as styles from './teachers-page.module.scss'

const TeachersPage: React.FC = () => {
    return (
        <Block className={styles.teachersPage}>
            <Search placeholder='Поиск' />
        </Block>
    )
}

export default TeachersPage
