export function getUrlWithSubdomain(subdomain: string) {
  const host = window.location.hostname;
  const protocol = window.location.protocol;

  return `${protocol}//${subdomain}.${host.split(".").slice(1).join(".")}`;
}

export function getFibermapApiBaseUrl() {
  return getUrlWithSubdomain("fibermap");
}

// TODO: Make sure this can work on mobile as well
export async function fetchFibermapAPI(
  path: string,
  options: RequestInit = {},
  baseUrl = getFibermapApiBaseUrl()
) {
  const url = `${baseUrl}${path}`;
  return fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }).then((response) => {
    return response;
  });
}
