import axios from "axios"

const BASE_URL = "https://api.jikan.moe/v4"

export const fetchMangaList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/manga`, {
      params: {
        // order_by: "popularity", // Sort by popularity rank
        sort: "desc", // Descending order
        limit: 4,
      },
    })
    return response.data.data // Jikan API returns results in a 'data' array
  } catch (error) {
    console.error("Error fetching manga list:", error)
    throw error
  }
}

export const fetchMangaDetails = async (mangaId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga/${mangaId}`)
    return response.data // Manga details
  } catch (error) {
    console.error("Error fetching manga details:", error)
    throw error
  }
}
