import { FieldInfo } from "./field-info.model";

export class FormData {
    public heading: string = "";
    public fields: FieldInfo[] = [];
    public addToOldDate: boolean = false;
    public date: string = "";
}
