// 쿠키 세팅하기
export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

// 쿠키 가져오기
export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

// 쿠키 삭제하기
export const deleteCookie = (name: string) => {
  setCookie(name, '');
}