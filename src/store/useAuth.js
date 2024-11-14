import {defineStore} from 'pinia'
import {ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const token = ref('')
    const user = ref('')
    const isAuthenticated = ref(false)

    function setToken(newtoken) {
        if (newtoken) {
            token.value = newtoken
        }else {
              console.log('No hay token')
            }
        }

        function getToken() {
            return token.value
        }

        return {
            token,
            user,
            isAuthenticated,
            setToken,
            getToken
        }
},
{
    persist: true
})