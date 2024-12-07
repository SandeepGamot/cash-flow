import { AppConfig } from "../../../config";
import { GoogleTokenResponse } from "./google.types";

const googleAuthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/auth";
  const options = {
    client_id: AppConfig.auth.google.oauth.clientId!,
    redirect_uri: AppConfig.auth.google.oauth.callbackUrl!,
    scope: [
      AppConfig.auth.google.oauth.scope.userInfo,
      AppConfig.auth.google.oauth.scope.email,
    ].join(" "),
    response_type: "code",
  };
  return `${rootUrl}?${new URLSearchParams(options).toString()}`;
};

const exchangeTokenForCode = async (code: string) => {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: JSON.stringify({
      code,
      client_id: AppConfig.auth.google.oauth.clientId!,
      redirect_uri: AppConfig.auth.google.oauth.callbackUrl!,
      client_secret: AppConfig.auth.google.oauth.clientSecret!,
      grant_type: "authorization_code",
    }),
  });
  return (await res.json()) as GoogleTokenResponse;
};

export const googleService = {
  googleAuthUrl,
  exchangeTokenForCode,
};
