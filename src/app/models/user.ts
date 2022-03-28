import { ProfileData } from "./profiledata";

export class User {
    id: number=-1;
    googleId: string = '';//GOOGLE-id
    username: string = ''; //email/phone
    password: string = '';
    category: string = '';
    userType: string = '';
    status: string = '';
    full_name: string = '';
    firstName: string = '';
    lastName: string = '';
    displayName: string = '';//GOOGLE-name
    description: string = '';
    photoUrl: string = '';//GOOGLE
    profileAvatarImgFileId: string = '';
    profileBannerImgFileId: string = '';
    settings: any;
    role:role = new role();
    circleUsersInfo: string = '';
    members: string[]=[];
    administrators: string[]=[];
    emailId: string = '';//GOOGLE-email
    phone: string = '';
    address: string = '';
    token?: any = '';//GOOGLE-idToken
    authToken:string = '';//GOOGLE
    provider:string = '';//GOOGLE
    sourceSystem: string = '';
    sourceId: string = '';
    profileDatas:ProfileData[] = [];
    otherContacts:any = [];
}

export class role {
    chamber:string = '';
    district: string = '';
    end_date: string = '';
    party: string = '';
    start_date: string = '';
    state: string = '';
    type: string = '';
}