export function validateRecaptcha(action = "PAY") {
  return new Promise(async (resolve, _reject) => {
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return resolve("");
    const recaptcha = await waitJsLibrary("grecaptcha");
    // @ts-ignore
    recaptcha.enterprise.ready(async () => {
      // @ts-ignore
      const recaptchaToken = await grecaptcha.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action }
      );
      resolve(recaptchaToken);
    });
  });
}

async function waitJsLibrary(libraryName: string, tries = 10) {
  return new Promise((resolve, _reject) => {
    // @ts-ignore
    if (typeof global[libraryName] !== "undefined") return resolve(global[libraryName]);
    setTimeout(() => {
      resolve(waitJsLibrary(libraryName, tries - 1));
    }, 3000);
  });
}
