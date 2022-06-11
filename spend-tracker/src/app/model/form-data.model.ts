import { FieldInfo } from "./field-info.model";

export class FormData {
    public heading: string = "";
    public fields: FieldInfo[] = [];
    public links: {title:string, url:string}[] = []
}
