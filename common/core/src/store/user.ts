import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { AuthApi, MenuApi } from '@yy-admin/common-apis'
import type { IMenuBuild, LoginForm, UserInfo } from '@yy-admin/common-apis'
import type { Router } from 'vue-router'
import { tokenStorage } from '../utils/cookie'
import { flatChildrenArr } from '../utils/array.util'

export const useUserStore = defineStore('core-user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const userMenuList = ref<IMenuBuild[]>([])
  const flatMenuList = computed(() => flatChildrenArr(userMenuList.value))
  let currentRouter: Router | null = null

  async function loginAction(loginForm: LoginForm) {
    const { token } = await AuthApi.login(loginForm)
    tokenStorage.setValue(token)
  }

  async function getUserInfo() {
    const user = await AuthApi.info()
    const menuList = await MenuApi.buildMenu()
    setUserInfo(user)
    return menuList
  }

  function setUserInfo(user: UserInfo) {
    userInfo.value = user
  }

  function setRenderMenuList(realMenu: IMenuBuild[], router: Router) {
    userMenuList.value = realMenu
    currentRouter = router
  }

  async function logout() {
    userInfo.value = null
    // remove currentRoute
    if (currentRouter) {
      userMenuList.value.forEach((item) => {
        currentRouter!.removeRoute(item.name)
      })
    }
    userMenuList.value = []
    tokenStorage.removeValue()
  }

  return {
    flatMenuList,
    userMenuList,
    userInfo,
    setRenderMenuList,
    logout,
    loginAction,
    getUserInfo,
  }
})
