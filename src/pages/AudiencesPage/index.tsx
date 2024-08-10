import React from 'react'
import Block from '@/components/Block'
import Search from '@/components/Search'

import * as styles from './audiences-page.module.scss'

const AudiencesPage: React.FC = () => {
    return (
        <Block className={styles.audiencesPage}>
            <Search placeholder='Поиск'/>
        </Block>
    )
}

export default AudiencesPage
