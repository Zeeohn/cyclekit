import { handleThemeColor } from '../store/layout'
import { useDispatch, useSelector } from 'react-redux'

export const useThemeColor = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.layout)

  const setThemeColor = value => {
    dispatch(handleThemeColor(value))
  }

  return { themeColor: store.themeColor, setThemeColor }
}
