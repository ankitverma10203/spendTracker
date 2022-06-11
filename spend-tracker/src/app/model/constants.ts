export enum FieldType {
  dropDown = "dropDown", text = "text", email = "email", number = "number", password = "password"
}

export enum UserFieldNames {
  emailId = "Email Id", password = "Password"
}

export const UserNameKey = "username";

export enum RecordFieldNames {
  category = "Category", message = "Message", amount = "Amount"
}

export const CategoryFieldOptions = ["Education", "Food", "Electronics", "Others"];

export const LoginPageHeading = "Login";
export const RegisterPageHeading = "Register";
export const RecordPageHeading = "Spendings";
export const RecordFormHeading = "Add Spend Details";

export const RecordsRouteLink = "/home/records";
export const RegisterRouteLink = "/user/register";
export const LoginRouteLink = "/user/login";
