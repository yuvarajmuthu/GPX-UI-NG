export class Alert {
    type: AlertType=AlertType.Info;
    message: string = '';
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}