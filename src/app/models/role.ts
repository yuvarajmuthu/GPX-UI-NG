export class Role {
    profileTemplateId:string;
    entityId:string;
    current:boolean;
    data:Roledata;

}

export class Roledata {
    district:string = '';
    chamber:string = '';
    state:string = '';
    party:string = '';
    status:string = '';
    member:string = '';
    committee:string = '';
    position:string = '';
    type:string = '';
    title:string = '';
    start:Date;
    end:Date;
}