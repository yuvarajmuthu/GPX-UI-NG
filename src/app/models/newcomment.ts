export class NewComment {
    parentPostId: string = '';
    entityId:string = '';
    postType: string = '';
    postText: string = '';
	relatedFiles: string = '';
	districtId: string = '';
    createdDate:string = '';
    lastModifiedDate:string = '';
    likedBy:any;
    likedByCurrentUser: boolean=false;
    comments:any;
    commentId:string = '';
}	
