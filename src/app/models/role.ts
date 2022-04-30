export class Role {
    id:string;
    profileTemplateId:string;
    entityId:string;
    current:boolean;
    data:Roledata = new Roledata();

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