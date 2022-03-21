export class Legislator {
    //public first_name: string;
    //public committees: Array<JSON>;
/*
constructor(
public bioguide_id: string,
public birthday:Date,
public chamber: string,
public contact_form: string,
public crp_id: string,
public district:number,
public facebook_id: string,
public fax: string,
public fec_ids:string[],
first_name,
public gender: string,
public govtrack_id: string,
public icpsr_id:number,
public in_office:boolean,
public last_name: string,
public leadership_role: string,
public middle_name: string,
public name_suffix: string,
public nickname: string,
public oc_email: string,
public ocd_id: string,
public office: string,
public party: string,
public phone: string,
public state: string,
public state_name: string,
public term_end:Date,
public term_start:Date,
public thomas_id: string,
public title: string,
public twitter_id: string,
public votesmart_id: string,
public website: string,
public youtube_id: string,
public bioguideImageUrl,
committees
){}
*/

last_name: string = '';
updated_at: Date = new Date();
sources: string[]=[];
full_name = '';
old_roles:any;
role:any;
id = '';
first_name = '';
middle_name = '';
district = '';
state = '';
boundary_id = '';
email = '';
all_ids: string[]=[];
leg_id = '';
party = '';
active: boolean=false;
transparencydata_id = '';
photo_url = '';
roles: string[]=[];
url = '';
created_at: Date = new Date();
chamber = '';
offices: string[]=[];
suffixes = '';
divisionOffice = '';
division = '';
ocdId = '';
otherContacts:any;
photoUrl:string='';
sourceSystem:string='';


public getFirstName():string{
    return this.first_name;
}

getLastName():string{
    return this.last_name;
}
}