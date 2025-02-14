export class UpdateProfileDto {
    name?: string;
    email?: string;
    password?: string;  // You should hash the password before storing it
    darkMode?: boolean;
}
