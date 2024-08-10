import React from 'react'
import Block from '@components/Block'
import AudiencesPage from '@pages/AudiencesPage'
import ClassesPage from '@pages/ClassesPage'
import GroupsPage from '@pages/GroupsPage'
import SubjectsPage from '@pages/SubjectsPage'
import TeachersPage from '@pages/TeachersPage'
import BottomMenu from './components/BottomMenu'

import { Navigate, Route, Routes } from 'react-router-dom'

import * as styles from './app.module.scss'

const App: React.FC = () => {
    return (
        <Block className={styles.app}>
            <BottomMenu />
            <Routes>
                <Route path='/audiences' element={<AudiencesPage />} />
                <Route path='/classes' element={<ClassesPage />} />
                <Route path='/groups' element={<GroupsPage />} />
                <Route path='/subjects' element={<SubjectsPage />} />
                <Route path='/teachers' element={<TeachersPage />} />
                <Route path='*' element={<Navigate to='/audiences' />} />
            </Routes>
        </Block>
    )
}

export default App
