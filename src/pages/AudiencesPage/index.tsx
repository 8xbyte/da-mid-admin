import AddIcon from '@/assets/add.svg'
import TrashIcon from '@/assets/trash.svg'
import Block from '@/components/Block'
import Button from '@/components/Button'
import Image from '@/components/Image'
import Input from '@/components/Input'
import Search from '@/components/Search'
import ShadowBlock from '@/components/ShadowBlock'
import Text from '@/components/Text'
import React, { useRef } from 'react'

import {
    addAudience,
    getAudiences,
    removeAudience,
    searchAudiences
} from '@/api/audiences'
import { IAudience } from '@/interfaces/audiences'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

import * as styles from './audiences-page.module.scss'

const AudiencesPage: React.FC = () => {
    const audiences = useAppSelector((state) => state.audiences)
    const auth = useAppSelector((state) => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [ref, inView] = useInView()
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const [searchText, setSearchText] = React.useState<string | null>(null)
    const [nameText, setNameText] = React.useState<string | null>(null)
    const [list, setList] = React.useState<Array<IAudience>>([])

    React.useEffect(() => {
        if (!auth.isAuth) {
            navigate('/login')
        } else {
            dispatch(
                getAudiences({
                    limit: 10,
                    offset: 0
                })
            )
        }
    }, [])

    React.useEffect(() => {
        if (inView && list.length % 10 === 0) {
            if (
                audiences.search.result &&
                audiences.search.result.length !== 0
            ) {
                if (searchText) {
                    dispatch(
                        searchAudiences({
                            offset: list.length,
                            limit: 10,
                            name: searchText
                        })
                    )
                }
            }
        }
    }, [inView])

    React.useEffect(() => {
        if (audiences.search.status === 'success' && audiences.search.result) {
            setList([...list, ...audiences.search.result])
        }
    }, [audiences.search.status])

    React.useEffect(() => {
        if (audiences.add.status === 'success' && audiences.add.result) {
            setList([audiences.add.result, ...list])
        }
    }, [audiences.add.status])

    React.useEffect(() => {
        if (audiences.remove.status === 'success' && audiences.remove.result) {
            setList(
                [...list].filter(
                    (audience) => audience.id !== audiences.remove.result!.id
                )
            )
        }
    }, [audiences.remove.result])

    const addAudienceHandler = () => {
        if (nameText) {
            dispatch(
                addAudience({
                    name: nameText
                })
            )
        }
    }

    const removeAudienceHandler = (id: number) => {
        dispatch(
            removeAudience({
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
                setList([])
                dispatch(
                    searchAudiences({
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
        <Block className={styles.audiencesPage}>
            <Search onChange={changeSearchHandler} placeholder='Поиск' />
            <ShadowBlock className={styles.addBlock}>
                <Text className={styles.text}>Добавить аудиторию</Text>
                <Block className={styles.controlBlock}>
                    <Input
                        placeholder='Название аудитории'
                        className={styles.input}
                        onChange={changeNameHandler}
                    />
                    <Button
                        onClick={addAudienceHandler}
                        className={styles.button}
                    >
                        <Image className={styles.image} src={AddIcon} />
                    </Button>
                </Block>
            </ShadowBlock>
            <ShadowBlock className={styles.audiencesBlock}>
                {list.length > 0 ? (
                    list.map((audience) => (
                        <Block
                            key={audience.id}
                            ref={ref}
                            className={styles.audienceBlock}
                        >
                            <Text className={styles.text}>{audience.name}</Text>
                            <Button
                                onClick={() =>
                                    removeAudienceHandler(audience.id)
                                }
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

export default AudiencesPage
