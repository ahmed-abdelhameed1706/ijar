import axios from "axios";

const unsplashAccessKey = "ICHoP9uSGRHQytjYEeK8VxXqTZY1gaIqRTsrrRM_9r0"; // Replace with your key
const baseUrl = "https://api.unsplash.com";

export async function getRandomCarImages() {
  const baseUrl =
    "https://api.unsplash.com/photos/random/?client_id=ICHoP9uSGRHQytjYEeK8VxXqTZY1gaIqRTsrrRM_9r0&query=car&orientation=landscape";

  try {
    if (process.env.FETCH_IMAGES === "true") {
      const response = await axios.get(baseUrl);
      const data = response.data;
      return data.urls.regular; // Adjust for desired image size
    }
  } catch (error) {
    console.error("Error fetching random car photos:", error);
    return []; // Handle error or return an empty array
  }
}
