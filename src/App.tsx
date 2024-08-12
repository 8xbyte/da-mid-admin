import Block from '@/components/Block'
import BottomMenu from '@/components/BottomMenu'
import AudiencesPage from '@/pages/AudiencesPage'
import ClassesPage from '@/pages/ClassesPage'
import GroupsPage from '@/pages/GroupsPage'
import SubjectsPage from '@/pages/SubjectsPage'
import TeachersPage from '@/pages/TeachersPage'
import React from 'react'
import LoginPage from './pages/LoginPage'

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useAppSelector } from './store/store'

import * as styles from './app.module.scss'

const App: React.FC = () => {
    const auth = useAppSelector((state) => state.auth)

    const navigate = useNavigate()

    React.useEffect(() => {
        if (auth.isAuth) {
            navigate('/audiences')
        } else {
            navigate('/login')
        }
    }, [auth.isAuth])

    return (
        <Block className={styles.app}>
            {auth.isAuth ? (
                <Block className={styles.page}>
                    <BottomMenu />
                    <Routes>
                        <Route path='/audiences' element={<AudiencesPage />} />
                        <Route path='/classes' element={<ClassesPage />} />
                        <Route path='/groups' element={<GroupsPage />} />
                        <Route path='/subjects' element={<SubjectsPage />} />
                        <Route path='/teachers' element={<TeachersPage />} />
                        <Route
                            path='*'
                            element={<Navigate to='/audiences' />}
                        />
                    </Routes>
                </Block>
            ) : (
                <LoginPage />
            )}
        </Block>
    )
}

export default App
