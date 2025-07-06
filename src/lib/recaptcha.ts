import "server-only";

export async function verifyCaptchaToken(token: string) {
  const secretKey = process.env.CAPTCHA_SECRET_KEY;
  if (!secretKey) {
    throw new Error("No secret key found");
  }

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  url.searchParams.append("secret", secretKey);
  url.searchParams.append("response", token);

  const response = await fetch(url, { method: "POST" });
  const captchaData = (await response.json()) as CaptchaData;

  if (!response.ok) {
    return null;
  }
  return captchaData;
}

interface CaptchaSuccess {
  success: true;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
}

interface CaptchaError {
  success: false;
  "error-codes": ErrorCodes[];
}

type CaptchaData = CaptchaSuccess | CaptchaError;

type ErrorCodes =
  | "missing-input-secret"
  | "invalid-input-secret"
  | "missing-input-response"
  | "invalid-input-response"
  | "bad-request"
  | "timeout-or-duplicate";
