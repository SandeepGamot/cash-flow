import { JwtPayload } from "jsonwebtoken";

export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface GoogleUserData extends JwtPayload {
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
}
