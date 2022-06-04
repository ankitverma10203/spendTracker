import { FieldType } from "./field-type"

export class FieldInfo {
    name: string = "";
    type: FieldType = FieldType.text;
    defaultValue: string = "";
    options: string[] = [];
}
