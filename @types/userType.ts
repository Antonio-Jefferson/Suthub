export interface UserDisplayInfo {
  id: number;
  photo: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  location: {
    lat: number;
    lng: number;
  };
}
