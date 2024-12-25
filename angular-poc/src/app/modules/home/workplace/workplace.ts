export interface SlideInterface {
  url: string;
  title: string;
  name: string;
  description: string;
  buttonLink: string;
  buttonText: string;
  likecount: number;
  commentcount: number;
  diffTime: string;
  time: string;
  profilePic: string;
  groupName: string;
  isShowMoreEnabled: boolean;
  order: number;
}

export interface ResponseModel {
  data: WorkplaceResponse[];
}

export interface WorkplaceResponse {
  id: string;
  message: string;
  canRead: boolean;
  from: fromdetails;
  seen: Seen;
  attachments: Array<any>;
  comments: Array<any>;
  like_count: Array<any>;
  love_count: Array<any>;
  haha_count: Array<any>;
  wow_count: Array<any>;
  sad_count: Array<any>;
  angry_count: Array<any>;
  total_reaction_count: Array<any>;
  paging: Array<any>;
}
/* eslint @typescript-eslint/naming-convention: "off" */
export interface fromdetails {
  name: string;
  id: Number;
}

export interface Seen {
  data: Array<any>;
  summary: Summary;
}

export interface Summary {
  total_count: Number;
}
