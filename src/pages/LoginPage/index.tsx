import Block from '@/components/Block'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ShadowBlock from '@/components/ShadowBlock'
import Text from '@/components/Text'
import React from 'react'

import { login } from '@/api/auth'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useNavigate } from 'react-router-dom'

import * as styles from './login-page.module.scss'

const LoginPage: React.FC = () => {
    const auth = useAppSelector((state) => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [loginText, setLoginText] = React.useState<string | null>(null)
    const [passwordText, setPasswordText] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (auth.isAuth) {
            navigate('/audiences')
        }
    }, [])

    const loginHandler = () => {
        if (loginText && passwordText) {
            dispatch(
                login({
                    login: loginText,
                    password: passwordText
                })
            )
        }
    }

    return (
        <Block className={styles.loginPage}>
            <ShadowBlock className={styles.middleBlock}>
                <Block className={styles.inputBlock}>
                    <Text className={styles.text}>Логин</Text>
                    <Input
                        placeholder='Логин'
                        className={styles.input}
                        onChange={(e) =>
                            setLoginText(
                                e.target.value === '' ? null : e.target.value
                            )
                        }
                    />
                </Block>
                <Block className={styles.inputBlock}>
                    <Text className={styles.text}>Пароль</Text>
                    <Input
                        type='password'
                        placeholder='Пароль'
                        className={styles.input}
                        onChange={(e) =>
                            setPasswordText(
                                e.target.value === '' ? null : e.target.value
                            )
                        }
                    />
                </Block>
                <Button onClick={loginHandler}>
                    <Text>Войти</Text>
                </Button>
            </ShadowBlock>
        </Block>
    )
}

export default LoginPage
