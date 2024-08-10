import React from 'react'
import Block from '@/components/Block'
import Search from '@/components/Search'

import * as styles from './groups-page.module.scss'

const GroupsPage: React.FC = () => {
    return (
        <Block className={styles.groupsPage}>
            <Search placeholder='Поиск' />
        </Block>
    )
}

export default GroupsPage
