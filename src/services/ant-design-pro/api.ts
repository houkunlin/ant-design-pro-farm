// @ts-ignore
export async function currentUser(options?: { [key: string]: any }) {
  return {
    nickname: "管理员",
    avatar: "",
  }
}

// @ts-ignore
export async function outLogin(options?: { [key: string]: any }) {
  // return request<Record<string, any>>(ApiAuthLoginOut, {
  //   method: 'POST',
  //   ...(options || {}),
  // });
  return {};
}
