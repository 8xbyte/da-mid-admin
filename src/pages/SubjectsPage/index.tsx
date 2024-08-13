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

import { addSubject, removeSubject, searchSubjects } from '@/api/subjects'
import { ISubject } from '@/interfaces/subjects'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

import * as styles from './subjects-page.module.scss'

const SubjectsPage: React.FC = () => {
    const subjects = useAppSelector((state) => state.subjects)
    const auth = useAppSelector((state) => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const timerRef = React.useRef<NodeJS.Timeout | null>(null)

    const [ref, inView] = useInView()
    const [searchText, setSearchText] = React.useState<string | null>(null)
    const [nameText, setNameText] = React.useState<string | null>(null)
    const [subjectList, setSubjectList] = React.useState<Array<ISubject>>([])

    React.useEffect(() => {
        if (!auth.isAuth) {
            navigate('/login')
        }
    }, [])

    React.useEffect(() => {
        if (inView && subjectList.length % 10 === 0) {
            if (subjects.search.result && subjects.search.result.length !== 0) {
                if (searchText) {
                    dispatch(
                        searchSubjects({
                            offset: subjectList.length,
                            limit: 10,
                            name: searchText
                        })
                    )
                }
            }
        }
    }, [inView])

    React.useEffect(() => {
        if (subjects.search.status === 'success' && subjects.search.result) {
            setSubjectList([...subjectList, ...subjects.search.result])
        }
    }, [subjects.search.status])

    React.useEffect(() => {
        if (subjects.add.status === 'success' && subjects.add.result) {
            setSubjectList([subjects.add.result, ...subjectList])
        }
    }, [subjects.add.status])

    React.useEffect(() => {
        if (subjects.remove.status === 'success' && subjects.remove.result) {
            setSubjectList(
                [...subjectList].filter(
                    (subject) => subject.id !== subjects.remove.result!.id
                )
            )
        }
    }, [subjects.remove.result])

    const addSubjectHandler = () => {
        if (nameText) {
            dispatch(
                addSubject({
                    name: nameText
                })
            )
        }
    }

    const removeSubjectHandler = (id: number) => {
        dispatch(
            removeSubject({
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
                setSubjectList([])
                dispatch(
                    searchSubjects({
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
        <Block className={styles.subjectsPage}>
            <Search onChange={changeSearchHandler} placeholder='Поиск' />
            <ShadowBlock className={styles.addBlock}>
                <Text className={styles.text}>Добавить предмет</Text>
                <Block className={styles.controlBlock}>
                    <Input
                        placeholder='Название предмета'
                        className={styles.input}
                        onChange={changeNameHandler}
                    />
                    <Button
                        onClick={addSubjectHandler}
                        className={styles.button}
                    >
                        <Image className={styles.image} src={AddIcon} />
                    </Button>
                </Block>
            </ShadowBlock>
            <ShadowBlock className={styles.subjectsBlock}>
                {subjectList.length > 0 ? (
                    subjectList.map((subject) => (
                        <Block
                            key={subject.id}
                            ref={ref}
                            className={styles.subjectBlock}
                        >
                            <Text className={styles.text}>{subject.name}</Text>
                            <Button
                                onClick={() => removeSubjectHandler(subject.id)}
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

export default SubjectsPage
