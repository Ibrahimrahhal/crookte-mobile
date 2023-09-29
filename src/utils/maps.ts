export default class MapUtil {
  private static apiKey: string = process.env
    .EXPO_PUBLIC_GMAPS_API_KEY as string;
  static async getStringAddressFromLocation(location: {
    lat: number;
    lng: number;
  }): Promise<string> {
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    const params = `latlng=${location.lat},${location.lng}&key=${this.apiKey}&language=ar`;
    const result = await (await fetch(`${baseUrl}?${params}`)).json();
    return result.results[0].formatted_address.replace(
      /[A-Za-z].*[A-Za-z]/g,
      "",
    );
  }
}
