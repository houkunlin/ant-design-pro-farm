namespace SERVER {
  type CurrentUserVo = {
    id?: string | number;
    nickname?: string;
    avatar?: string;
    authorities?: string[];
  }
}
