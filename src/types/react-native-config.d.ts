declare module "react-native-config" {
  interface Env {
    CLIENT_ID: string
    COMICVINE_API_KEY: string
    RIDERECT_URI: string
    // Add other environment variables here
  }

  const Config: Env
  export default Config
}
