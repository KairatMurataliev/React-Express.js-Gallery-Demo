import React from 'react';
import {baseURL} from "../../../axios.ts";
import {Avatar} from "@mui/material";
import {User} from "../../../types";

interface Props {
  style?: object | null;
  user: User
}

export const UserAvatar: React.FC<Props> = ({style, user}) => {
  console.log(user);
  let avatar = '';
  if (user.avatar) {
    if (user.avatar.includes('images') || user.avatar.includes('fixtures')) {
      avatar = `${baseURL}/${user.avatar}`;
    } else {
      avatar = user.avatar;
    }
  }

  return <Avatar style={style || {}} alt="user-avatar" src={avatar}/>
};