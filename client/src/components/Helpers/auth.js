export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

// taking the token, splitting it up and returning the payload thats encoded
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  return JSON.parse(atob(splitToken[1]))
}

// checking to see if user is authenticated
export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < payload.exp
}

// checking that user id from payload matches job user id
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