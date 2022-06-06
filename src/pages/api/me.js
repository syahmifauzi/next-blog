export default async function handler(req, res) {
  try {
    // should verify jwt token first before proceeding
    const MOCK_USER = {
      username: 'admin',
      email: 'admin@example.com'
    }
    res.status(200).json(MOCK_USER)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
