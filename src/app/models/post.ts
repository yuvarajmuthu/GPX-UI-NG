export class Post {
	public id:number=-1;
	public entityId:string = '';
	public parentPostId:string = '';		
	public userId: string = '';
	public postText: string = ''; 
	public postCategory:string = '';
	public imageUrl:string = '';
	public videoUrl:string = '';
	public districtId:string = '';
	public taggedEntityId:string[]=[];
	public likedBy:string[]=[];
	public likedByCurrentUser:boolean=false;
	public postType:string = ''; // OBSOLETE
	public imageFile:any;
	public comments: any;
	public totalComments:number=-1;
	public containsVideo:boolean;
	public containsImage:boolean;
	public containsText:boolean;
	public relatedFiles:string[];
	public lastModifiedDate:Date;
	constructor(

	){}
}	

interface PostJSON {
	id:string;
	userName: string;
	txtPost: string;
}