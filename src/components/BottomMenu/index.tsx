import React from 'react'
import Block from '@/components/Block'
import Text from '@/components/Text'
import ShadowBlock from '../ShadowBlock'

import { useNavigate } from 'react-router-dom'

import * as styles from './bottom-menu.module.scss'

const BottomMenu: React.FC = () => {
    const navigate = useNavigate()

    return (
        <ShadowBlock className={styles.bottomMenu}>
            <Block className={styles.topMenu}>
                <Text
                    onClick={() => navigate('/audiences')}
                    className={styles.menuItem}
                >
                    Аудитории
                </Text>
                <Text
                    onClick={() => navigate('/subjects')}
                    className={styles.menuItem}
                >
                    Предметы
                </Text>
                <Text
                    onClick={() => navigate('/groups')}
                    className={styles.menuItem}
                >
                    Группы
                </Text>
                <Text
                    onClick={() => navigate('/teachers')}
                    className={styles.menuItem}
                >
                    Преподаватели
                </Text>
                <Text
                    onClick={() => navigate('/classes')}
                    className={styles.menuItem}
                >
                    Занятия
                </Text>
            </Block>
            <Text className={styles.menuItem}>Выход</Text>
        </ShadowBlock>
    )
}

export default BottomMenu
