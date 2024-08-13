import AddIcon from '@/assets/add.svg'
import TrashIcon from '@/assets/trash.svg'
import Block from '@/components/Block'
import Button from '@/components/Button'
import Image from '@/components/Image'
import Input from '@/components/Input'
import Search from '@/components/Search'
import ShadowBlock from '@/components/ShadowBlock'
import Text from '@/components/Text'
import React from 'react'

import { addGroup, removeGroup, searchGroups } from '@/api/groups'
import { IGroup } from '@/interfaces/groups'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

import * as styles from './groups-page.module.scss'

const GroupsPage: React.FC = () => {
    const groups = useAppSelector((state) => state.groups)
    const auth = useAppSelector((state) => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const timerRef = React.useRef<NodeJS.Timeout | null>(null)

    const [ref, inView] = useInView()
    const [searchText, setSearchText] = React.useState<string | null>(null)
    const [nameText, setNameText] = React.useState<string | null>(null)
    const [groupList, setGroupList] = React.useState<Array<IGroup>>([])

    React.useEffect(() => {
        if (!auth.isAuth) {
            navigate('/login')
        }
    }, [])

    React.useEffect(() => {
        if (inView && groupList.length % 10 === 0) {
            if (groups.search.result && groups.search.result.length !== 0) {
                if (searchText) {
                    dispatch(
                        searchGroups({
                            offset: groupList.length,
                            limit: 10,
                            name: searchText
                        })
                    )
                }
            }
        }
    }, [inView])

    React.useEffect(() => {
        if (groups.search.status === 'success' && groups.search.result) {
            setGroupList([...groupList, ...groups.search.result])
        }
    }, [groups.search.status])

    React.useEffect(() => {
        if (groups.add.status === 'success' && groups.add.result) {
            setGroupList([groups.add.result, ...groupList])
        }
    }, [groups.add.status])

    React.useEffect(() => {
        if (groups.remove.status === 'success' && groups.remove.result) {
            setGroupList(
                [...groupList].filter(
                    (audience) => audience.id !== groups.remove.result!.id
                )
            )
        }
    }, [groups.remove.result])

    const addGroupHandler = () => {
        if (nameText) {
            dispatch(
                addGroup({
                    name: nameText
                })
            )
        }
    }

    const removeGroupHandler = (id: number) => {
        dispatch(
            removeGroup({
                id
            })
        )
    }

    const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchText(value === '' ? null : value)

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            if (value) {
                setGroupList([])
                dispatch(
                    searchGroups({
                        limit: 10,
                        offset: 0,
                        name: value
                    })
                )
            }
        }, 500)
    }

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setNameText(value === '' ? null : value)
    }

    return (
        <Block className={styles.groupsPage}>
            <Search onChange={changeSearchHandler} placeholder='Поиск' />
            <ShadowBlock className={styles.addBlock}>
                <Text className={styles.text}>Добавить аудиторию</Text>
                <Block className={styles.controlBlock}>
                    <Input
                        placeholder='Название аудитории'
                        className={styles.input}
                        onChange={changeNameHandler}
                    />
                    <Button onClick={addGroupHandler} className={styles.button}>
                        <Image className={styles.image} src={AddIcon} />
                    </Button>
                </Block>
            </ShadowBlock>
            <ShadowBlock className={styles.groupsBlock}>
                {groupList.length > 0 ? (
                    groupList.map((group) => (
                        <Block
                            key={group.id}
                            ref={ref}
                            className={styles.groupBlock}
                        >
                            <Text className={styles.text}>{group.name}</Text>
                            <Button
                                onClick={() => removeGroupHandler(group.id)}
                                className={styles.removeButton}
                            >
                                <Image
                                    className={styles.image}
                                    src={TrashIcon}
                                />
                            </Button>
                        </Block>
                    ))
                ) : (
                    <Text className={styles.emptyText}>Пусто</Text>
                )}
            </ShadowBlock>
        </Block>
    )
}

export default GroupsPage
