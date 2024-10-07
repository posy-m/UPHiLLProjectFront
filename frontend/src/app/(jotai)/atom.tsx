import { atom } from 'jotai'

export const isLoginAtom = atom(false)

export const userInfo = atom({
  userId: ''
})