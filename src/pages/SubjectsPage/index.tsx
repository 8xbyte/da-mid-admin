import React from 'react'
import Block from '@/components/Block'
import Search from '@/components/Search'

import * as styles from './subjects-page.module.scss'

const SubjectsPage: React.FC = () => {
    return (
        <Block className={styles.subjectsPage}>
            <Search placeholder='Поиск' />
        </Block>
    )
}

export default SubjectsPage
