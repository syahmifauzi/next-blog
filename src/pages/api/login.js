const getUserMock = async (username) => {
  if (username === 'admin') {
    return {
      username,
      password: 'admin'
    }
  }
  return null
}

export default async function handler(req, res) {
  const { username, password } = req.body

  try {
    const user = await getUserMock(username)
    // delay 2s to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (!user || password !== user.password) {
      res.status(401).json({ error: 'Invalid Credentials' })
    } else {
      const token = 'generated-jwt-token'
      res.status(200).json({ token })
    }
  } catch (error) {
    console.log({ error })
    res.status(500).json({ error: error.message })
  }
}
