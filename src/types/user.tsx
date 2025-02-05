export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  last_login: string | null;
  profile_picture?: string;
  other_fields?: string; // Add other fields if needed
}
