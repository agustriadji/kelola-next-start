import { handleFormSubmit } from '@/controllers/authControler'
import { useSignInStore } from '@/store/authentication/useSignInFormStore'
import { useRouter } from 'next/navigation'

export const useSignInForm = () => {
  const { username, password, error, setField } = useSignInStore()
  const router = useRouter()

  const onChange = (e) => {
    console.log('asdasdas', e.target.value)
    setField(e.target.username, e.target.value)
  }
  const onSubmit = async () => {
    const result = await handleFormSubmit({ username, password })
    if (result.error) {
      setField('error', result.error)
    } else {
      setField('isAuth', true)
      setField('username', result?.data?.username)
      router.push('/dashboard')
    }
  }

  return { username, password, error, onChange, onSubmit }
}
