'use server'

import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

export async function logoutUserAction() {
    SessionManager.removeSession()
    redirect('/')
}
