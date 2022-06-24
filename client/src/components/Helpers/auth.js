
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  return JSON.parse(atob(splitToken[1]))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < payload.exp
}

export function userIsOwner(userId) {
  const payload = getPayload()
  if (!payload) {
    return false
  }
  if (!userIsAuthenticated()) {
    return false
  }
  return userId === payload.sub
}

export const getUserId = () => {
  const payload = getPayload()
  return payload && payload.sub
}
